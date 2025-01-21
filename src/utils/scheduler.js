import cron from "node-cron";
import handler from "../pages/api/executePuppeteer"; // Ensure path is correct
import mongoose from "mongoose";
import ScheduledTask from "../models/ScheduledTask"; // Import your model

// Convert a Date object to a cron expression
const getCronExpressionFromDate = (date, recurrence) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // Cron uses 1-based months
  const dayOfWeek = date.getDay(); // Day of the week (0 = Sunday)

  let cronExpression;

  switch (recurrence) {
    case "daily":
      cronExpression = `${minutes} ${hours} * * *`; // Runs daily at the specified time
      break;
    case "weekly":
      cronExpression = `${minutes} ${hours} * * ${dayOfWeek}`; // Runs weekly on the same weekday
      break;
    case "monthly":
      cronExpression = `${minutes} ${hours} ${dayOfMonth} * *`; // Runs monthly on the same day of the month
      break;
    default:
      cronExpression = `${minutes} ${hours} ${dayOfMonth} ${month} *`; // Runs once at the specified time
  }

  return cronExpression;
};

export const schedulePuppeteerJob = async (scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence) => {
  try {
    const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);
    console.log("Cron Expression:", cronExpression);

    // Schedule the Puppeteer job
    cron.schedule(cronExpression, async () => {
      console.log(`Executing Puppeteer script for recordId ${recordId} at scheduled time`);

      const requestBody = {
        recordId,
        scriptId, // Ensuring scriptId is passed correctly
        script: aIGeneratedCode, // AI-generated script content
      };

      // Request and response mock to trigger the handler
      const req = { body: requestBody, method: "POST" };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            console.log("API Response:", statusCode, data);
          },
        }),
      };

      // Trigger Puppeteer execution
      await handler(req, res);

      // After successful execution, save to database
      await saveTaskToDatabase(recordId, scriptId, aIGeneratedCode, scheduledTime);

    });
  } catch (err) {
    console.error("Error scheduling Puppeteer job", err);
  }
};

// Function to save the task to MongoDB after execution
const saveTaskToDatabase = async (recordId, scriptId, aIGeneratedCode, scheduledTime) => {
  try {
    // Ensure database connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Create a new task document
    const newTask = new ScheduledTask({
      recordId,
      scriptId,
      script: aIGeneratedCode,
      scheduledTime,
      status: "completed", // Assuming the task was completed after execution
    });

    // Save the task
    await newTask.save();
    console.log("Scheduled task saved to the database.");
  } catch (err) {
    console.error("Error saving task to database", err);
  }
};
