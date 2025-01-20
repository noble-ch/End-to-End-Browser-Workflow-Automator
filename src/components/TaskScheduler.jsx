import { useState } from "react";

function TaskScheduler({ aIGeneratedCode, recordId }) {
  const [scheduledTime, setScheduledTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSchedule = async () => {
    if (!scheduledTime) {
      setError("Please select a time to schedule.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/schedulePuppeteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduledTime,
          aIGeneratedCode,
          recordId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error scheduling task: ${response.statusText}`);
      }

      // Handle success (maybe show confirmation)
      alert("Task scheduled successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Schedule Puppeteer Execution</h3>
      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        className="border p-2 mt-2"
      />
      <button
        onClick={handleSchedule}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Scheduling..." : "Schedule"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default TaskScheduler;

