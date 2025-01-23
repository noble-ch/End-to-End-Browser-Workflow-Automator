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
      // console.log("Database connected successfully");
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
let scheduledJob = {};// Function to schedule Puppeteer job
export const schedulePuppeteerJob = async (scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence) => {

  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);
  console.log("Scheduled Time:", scheduledTime);
  console.log("Parsed Date:", new Date(scheduledTime));
  console.log("Generated Cron Expression:", cronExpression);
  const runType = "automatic";
  // Create the cron job
  const job = cron.schedule(cronExpression, async () => {
    const req = {
      body: { recordId, scriptId, script: aIGeneratedCode, runType},
      method: "POST",
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => console.log("API Response:", statusCode, data),
      }),
    };
    await handler(req, res); 
  });
  scheduledJobs[scriptId] = job;
  console.log("Job scheduled:", scriptId);
};

export const cancelPuppeteerJob = async (scriptId) => {
  // Check if the job exists in memory
  const job = scheduledJobs[scriptId];
  if (job) {
    job.stop(); 
    console.log("Job canceled and removed from memory:", scriptId);
  } else {
    console.warn("No job found in memory for scriptId:", scriptId);
  }

  try {
    const result = await ScheduledTask.findOneAndUpdate(
      { scriptId },
      { status: "canceled" }, 
      { new: true } 
    );

    if (result) {
      console.log("Task status updated to 'canceled' in database:", scriptId);
      return true;
    } else {
      console.warn("Task not found in database for scriptId:", scriptId);
      return false;
    }
  } catch (error) {
    console.error("Error updating task status in database:", error);
    throw new Error("Error updating task status in database");
  }
};



// // Helper function to save the task to the database
// const saveTaskToDatabase = async (recordId, scriptId, aIGeneratedCode, scheduledTime, recurrence) => {
//   await ensureDbConnection(); // Ensure DB connection

//   try {
//     // Check if the task already exists in the database
//     const existingTask = await ScheduledTask.findOne({ scriptId });

//     if (existingTask) {
//       // Update the existing task
//       existingTask.scheduledTime = scheduledTime;
//       existingTask.script = aIGeneratedCode;
//       existingTask.status = "scheduled";
//       existingTask.recurrence = recurrence;
//       await existingTask.save();
//       // console.log("Task updated in database:", existingTask);
//     } else {
//       // Create a new task
//       const newTask = new ScheduledTask({
//         recordId,
//         scriptId,
//         script: aIGeneratedCode,
//         scheduledTime,
//         status: "scheduled",
//         recurrence,
//       });
//       await newTask.save();
//       // console.log("New task saved to database:", newTask);
//     }
//   } catch (error) {
//     console.error("Error saving task to database:", error);
//     throw new Error("Error saving task to database");
//   }
// };



// Function to fetch a scheduled job from scheduledJobs
export const getScheduledJob = async (scriptId) => {
  try {

   
    const dbJob = await ScheduledTask.findOne({ scriptId });

    if (!dbJob) {
    
      return null;
    }

    // Return the serialized database job details
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
};

// Function to edit an existing Puppeteer job
export const editPuppeteerJob = async (scriptId, scheduledTime, aIGeneratedCode, recurrence) => {
  await ensureDbConnection(); // Ensure DB connection

  // Cancel the existing job if it exists
  const existingJob = scheduledJobs[scriptId];
  if (existingJob) {
    existingJob.stop();
    delete scheduledJobs[scriptId];
    console.log("Existing job canceled:", scriptId);
  } else {
    console.log("No existing job found to cancel for scriptId:", scriptId);
  }

  // Create a new cron expression based on the updated scheduledTime and recurrence
  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);
  console.log("Generated Cron Expression:", cronExpression); // Log cron expression to debug

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

    console.log(`Running job for scriptId: ${scriptId}`); // Log job execution
    await handler(req, res); // Execute the Puppeteer script
    await saveTaskToDatabase(null, scriptId, aIGeneratedCode, scheduledTime, recurrence);
  });

  // Ensure the job is stored in memory
  scheduledJobs[scriptId] = newJob;
  console.log("New job scheduled:", scriptId);

  // Update the database with the new job details
  try {
    await saveTaskToDatabase(null, scriptId, aIGeneratedCode, scheduledTime, recurrence);
    console.log("Job updated successfully in database:", scriptId);
  } catch (error) {
    console.error("Error updating task in database:", error);
    throw new Error("Error updating task in database");
  }
};
