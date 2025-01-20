// utils/scheduler.js

import cron from "node-cron";
import { executePuppeteerScript } from "./puppeteerExecutor"; // Function to run Puppeteer

export const schedulePuppeteerJob = async (scheduledTime, aIGeneratedCode, recordId) => {
  // Convert the scheduled time to a cron expression
  const cronExpression = getCronExpressionFromDate(new Date(scheduledTime));

  // Schedule the job
  cron.schedule(cronExpression, async () => {
    try {
      // Execute the Puppeteer script
      await executePuppeteerScript(aIGeneratedCode, recordId);
    } catch (err) {
      console.error("Error executing Puppeteer script", err);
    }
  });
};

const getCronExpressionFromDate = (date) => {
  // Create a cron expression based on the selected date
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1; // cron uses 1-12 for months
  const year = date.getFullYear();

  return `${minutes} ${hours} ${day} ${month} *`;
};
