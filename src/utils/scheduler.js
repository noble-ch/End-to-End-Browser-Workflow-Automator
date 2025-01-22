import cron from "node-cron";
import handler from "@/pages/api/executePuppeteer";
import mongoose from "mongoose";
import ScheduledTask from "@/models/ScheduledTask";

let scheduledJobs = {};

// Helper function to ensure DB connection
const ensureDbConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw new Error("Database connection failed");
    }
  } else {
    console.log("Database is already connected");
  }
};

// Convert a Date object to a cron expression
const getCronExpressionFromDate = (date, recurrence) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  switch (recurrence) {
    case "daily":
      return `${minutes} ${hours} * * *`;
    case "weekly":
      return `${minutes} ${hours} * * ${dayOfWeek}`;
    case "monthly":
      return `${minutes} ${hours} ${dayOfMonth} * *`;
    default:
      return `${minutes} ${hours} ${dayOfMonth} ${month} *`; // One-time
  }
};

// Function to schedule Puppeteer job
export const schedulePuppeteerJob = async (scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence) => {
  await ensureDbConnection(); // Ensure DB connection

  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);

  // Create the cron job
  const job = cron.schedule(cronExpression, async () => {
    const req = {
      body: { recordId, scriptId, script: aIGeneratedCode },
      method: "POST",
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => console.log("API Response:", statusCode, data),
      }),
    };

    await handler(req, res); // Execute the Puppeteer script
    await saveTaskToDatabase(recordId, scriptId, aIGeneratedCode, scheduledTime, recurrence);
  });

  // Store the job in the in-memory object
  scheduledJobs[scriptId] = job;

  // Save the job to the database
  await saveTaskToDatabase(recordId, scriptId, aIGeneratedCode, scheduledTime, recurrence);

  console.log("Job scheduled:", scriptId);
};

// Function to cancel a scheduled Puppeteer job
export const cancelPuppeteerJob = async (scriptId) => {
  await ensureDbConnection(); // Ensure DB connection

  const job = scheduledJobs[scriptId];
  if (job) {
    job.stop();
    delete scheduledJobs[scriptId];
    console.log("Job canceled:", scriptId);

    // Update the database to reflect the cancellation
    const task = await ScheduledTask.findOne({ scriptId });
    if (task) {
      task.status = "canceled";
      await task.save();
      console.log("Task updated to canceled in database:", scriptId);
    }

    return true;
  }

  return false;
};

// Helper function to save the task to the database
const saveTaskToDatabase = async (recordId, scriptId, aIGeneratedCode, scheduledTime, recurrence) => {
  await ensureDbConnection(); // Ensure DB connection

  try {
    // Check if the task already exists in the database
    const existingTask = await ScheduledTask.findOne({ scriptId });

    if (existingTask) {
      // Update the existing task
      existingTask.scheduledTime = scheduledTime;
      existingTask.script = aIGeneratedCode;
      existingTask.status = "scheduled";
      existingTask.recurrence = recurrence;
      await existingTask.save();
      console.log("Task updated in database:", existingTask);
    } else {
      // Create a new task
      const newTask = new ScheduledTask({
        recordId,
        scriptId,
        script: aIGeneratedCode,
        scheduledTime,
        status: "scheduled",
        recurrence,
      });
      await newTask.save();
      console.log("New task saved to database:", newTask);
    }
  } catch (error) {
    console.error("Error saving task to database:", error);
    throw new Error("Error saving task to database");
  }
};



// Function to fetch a scheduled job from scheduledJobs
export const getScheduledJob = async (scriptId) => {
  try {
    // First, check the in-memory scheduledJobs object
    const job = scheduledJobs[scriptId];

    if (job) {
      console.log("Fetched job from in-memory storage:", job);
      return job;
    }

    // If not found in-memory, fetch from the database
    const dbJob = await ScheduledTask.findOne({ scriptId });

    if (!dbJob) {
      console.log(`No job found in database for scriptId: ${scriptId}`);
      return null;
    }

    // Return the job from the database
    console.log("Fetched job from database:", dbJob);
    return {
      scriptId: dbJob.scriptId,
      scheduledTime: dbJob.scheduledTime,
      recurrence: dbJob.recurrence,
      status: dbJob.status,
    };
  } catch (error) {
    console.error("Error fetching scheduled job:", error);
    throw new Error("Error fetching scheduled job");
  }
}
// Function to edit an existing Puppeteer job
export const editPuppeteerJob = async (scriptId, scheduledTime, aIGeneratedCode, recurrence) => {
  await ensureDbConnection(); // Ensure DB connection

  // Cancel the existing job
  const existingJob = scheduledJobs[scriptId];
  if (existingJob) {
    existingJob.stop();
    delete scheduledJobs[scriptId];
    console.log("Existing job canceled:", scriptId);
  }

  // Create a new cron expression based on the updated scheduledTime and recurrence
  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);

  // Schedule a new job with updated details
  const newJob = cron.schedule(cronExpression, async () => {
    const req = {
      body: { scriptId, script: aIGeneratedCode },
      method: "POST",
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => console.log("API Response:", statusCode, data),
      }),
    };

    await handler(req, res); // Execute the Puppeteer script
    await saveTaskToDatabase(null, scriptId, aIGeneratedCode, scheduledTime, recurrence);
  });

  // Update the in-memory scheduledJobs object
  scheduledJobs[scriptId] = newJob;

  // Update the database
  try {
    await saveTaskToDatabase(null, scriptId, aIGeneratedCode, scheduledTime, recurrence);
    console.log("Job updated successfully in database:", scriptId);
  } catch (error) {
    console.error("Error updating task in database:", error);
    throw new Error("Error updating task in database");
  }
};
