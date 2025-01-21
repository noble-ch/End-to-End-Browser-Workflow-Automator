import { useState, useEffect } from "react";

function TaskScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(""); // State to hold the scheduled time
  const [isScheduling, setIsScheduling] = useState(false); // State to show scheduling status
  const [recurrence, setRecurrence] = useState("once"); // State to handle recurrence selection (once, daily, weekly, monthly)

  useEffect(() => {
    if (scriptId) {
      console.log("Script ID received in TaskScheduler:", scriptId);
    }
  }, [scriptId]);

  const handleSchedule = async () => {
    if (!scheduledTime || !scriptId) {
      alert("Please provide a scheduled time and script ID.");
      return;
    }

    setIsScheduling(true);
    try {
      // Send the data to the API to schedule the Puppeteer job with recurrence
      const response = await fetch("/api/schedulePuppeteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduledTime,
          aIGeneratedCode,
          recordId,
          scriptId, // Include scriptId in the request body
          recurrence, // Add recurrence field
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while scheduling the task.");
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div>
      <h3>Task Scheduler</h3>
      
      <label htmlFor="scheduledTime">Scheduled Time: </label>
      <input
        type="datetime-local"
        id="scheduledTime"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
      />
      
      <label htmlFor="recurrence">Recurrence: </label>
      <select
        id="recurrence"
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
      >
        <option value="once">Once</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <button onClick={handleSchedule} disabled={isScheduling}>
        {isScheduling ? "Scheduling..." : "Schedule Task"}
      </button>
    </div>
  );
}

export default TaskScheduler;
