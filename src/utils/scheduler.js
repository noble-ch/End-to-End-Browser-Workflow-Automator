import cron from "node-cron";
import handler from "@/pages/api/executePuppeteer";
import mongoose from "mongoose";
import ScheduledTask from "@/models/ScheduledTask";

let scheduledJobs = {};

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

export const schedulePuppeteerJob = async (scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence) => {
  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime), recurrence);

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

  scheduledJobs[scriptId] = job;
};

export const cancelPuppeteerJob = (scriptId) => {
  const job = scheduledJobs[scriptId];
  if (job) {
    job.stop();
    delete scheduledJobs[scriptId];
    return true;
  }
  return false;
};

const saveTaskToDatabase = async (recordId, scriptId, aIGeneratedCode, scheduledTime, recurrence) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const newTask = new ScheduledTask({
    recordId,
    scriptId,
    script: aIGeneratedCode,
    scheduledTime,
    status: "completed",
    recurrence,
  });

  await newTask.save();
};

export const getScheduledJob = async (scriptId) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  return ScheduledTask.findOne({ scriptId });
};

export const updateScheduledJob = async (scriptId, updatedData) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  return ScheduledTask.updateOne({ scriptId }, { $set: updatedData });
};
