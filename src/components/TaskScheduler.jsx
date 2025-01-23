import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TaskScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(null); // Correctly initializing as null
  const [isScheduling, setIsScheduling] = useState(false);
  const [recurrence, setRecurrence] = useState(""); // Ensure default state
  const [isEditing, setIsEditing] = useState(true);
  const [isScheduled, setIsScheduled] = useState(false);

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
          recurrence,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setIsScheduled(true);
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
        body: JSON.stringify({ scriptId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setIsScheduled(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred while stopping the task.");
    }
  };

  return (
    <div style={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Task Scheduler</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scheduling Section */}
          <div style={styles.inputGroup}>
            <Label htmlFor="scheduledTime" style={styles.label}>
              Time:
            </Label>
            <DatePicker
              selected={scheduledTime}
              onChange={(date) => setScheduledTime(date)}
              showTimeSelect
              dateFormat="Pp"
              style={styles.input}
              disabled={!isEditing}
            />
          </div>

          <div style={styles.inputGroup}>
            <Label htmlFor="recurrence" style={styles.label}>
              Repeat:
            </Label>
            <select
              id="recurrence"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              style={styles.select}
              disabled={!isEditing}
            >
              <option value="" disabled>
                Select Recurrence
              </option>
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          {/* Buttons */}
          <div style={styles.buttonContainer}>
            {isScheduled ? (
              <Button onClick={handleStop} style={styles.stopButton}>
                Stop Task
              </Button>
            ) : (
              <Button
                onClick={handleSchedule}
                style={styles.scheduleButton}
                disabled={isScheduling}
              >
                {isScheduling ? "Scheduling..." : "Schedule Task"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
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
};

