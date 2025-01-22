import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(""); //State to hold the scheduled time
  const [isScheduling, setIsScheduling] = useState(false); //State to show scheduling status
  const [recurrence, setRecurrence] = useState(""); //State to handle recurrence selection
  const [isEditing, setIsEditing] = useState(true); //State to handle editing mode
  const [isScheduled, setIsScheduled] = useState(false); //State to track if the task is scheduled

  useEffect(() => {
    if (scriptId) {
      console.log("Script ID received in TaskScheduler:", scriptId);
    }
  }, [scriptId]);

  const handleSchedule = async () => {
    if (!scheduledTime || !scriptId || !recurrence) {
      alert("Please provide a scheduled time, script ID, and recurrence.");
      return;
    }

    setIsScheduling(true);
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
          scriptId,
          recurrence, // Include recurrence in the request body
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setIsScheduled(true); // Mark the task as scheduled
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while scheduling the task.");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleStop = async () => {
    if (!scriptId) {
      alert("No task to stop.");
      return;
    }
  
    try {
      const response = await fetch("/api/stopPuppeteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scriptId }), // Send scriptId to stop the task
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setIsScheduled(false); // Change button back to "Schedule Task"
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while stopping the task.");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Task Scheduler</h3>

      {/* Scheduling Section */}
      <div style={styles.inputGroup}>
        <label htmlFor="scheduledTime" style={styles.label}>
          Time:
        </label>
        <DatePicker
          selected={scheduledTime ? new Date(scheduledTime) : null}
          onChange={(date) => setScheduledTime(date.toISOString())}
          showTimeSelect
          dateFormat="Pp"
          style={styles.input}
          disabled={!isEditing}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="recurrence" style={styles.label}>
          Repeat:
        </label>
        <select
          id="recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          style={styles.select}
          disabled={!isEditing}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        {isScheduled ? (
          <button onClick={handleStop} style={styles.stopButton}>
            Stop Task
          </button>
        ) : (
          <button onClick={handleSchedule} style={styles.scheduleButton} disabled={isScheduling}>
            {isScheduling ? "Scheduling..." : "Schedule Task"}
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskScheduler;

const styles = {
  container: {
    width: "350px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#e9ecef",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5em",
    marginBottom: "20px",
    color: "#343a40",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#495057",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  scheduleButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  stopButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#ffc107",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};
