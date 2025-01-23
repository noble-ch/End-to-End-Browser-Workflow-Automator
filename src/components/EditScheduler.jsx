import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "react-datepicker/dist/react-datepicker.css";

function EditScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(null);
  const [recurrence, setRecurrence] = useState("once");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch current job details if editing an existing schedule
  useEffect(() => {
    const fetchJobDetails = async () => {
        if (scriptId) {
            try {
                const response = await fetch(`/api/taskScheduleHandler?scriptId=${scriptId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.scheduledTime && !isNaN(new Date(data.scheduledTime).getTime())) {
                        setScheduledTime(new Date(data.scheduledTime));
                    } else {
                        console.error("Invalid date received:", data.scheduledTime);
                    }
                    setRecurrence(data.recurrence || "once");
                } else {
                    console.error("Failed to fetch job details:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        }
    };
    fetchJobDetails();
}, [scriptId]);

  const handleEditSchedule = async () => {
    if (!scheduledTime || !aIGeneratedCode || !recordId || !scriptId) {
      alert("All fields are required. Please complete the form.");
      return;
    }
    if (!scheduledTime || isNaN(new Date(scheduledTime).getTime())) {
      alert("Please select a valid date and time.");
      return;
  }
    setLoading(true);
    try {
      const payload = {
        scheduledTime: scheduledTime.toISOString(),
        aIGeneratedCode,
        recordId,
        scriptId,
        recurrence,
      };

      const response = await fetch(`/api/taskScheduleHandler`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // On success, update the state to reflect the new job details
        const updatedJob = await response.json();
        setScheduledTime(new Date(updatedJob.scheduledTime));
        setRecurrence(updatedJob.recurrence);
        alert("Scheduler updated successfully!");
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update scheduler.");
      }
    } catch (error) {
      console.error("Error updating scheduler:", error);
      alert("An error occurred while updating the scheduler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Edit Scheduler</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={styles.formGroup}>
            <Label style={styles.label}>Scheduled Time:</Label>
            <DatePicker
              selected={scheduledTime}
              onChange={(date) => setScheduledTime(date)}
              showTimeSelect
              dateFormat="Pp"
              disabled={!isEditing}
              customInput={
                <input style={styles.datePicker} placeholder="Select date and time" />
              }
            />
          </div>
          <div style={styles.formGroup}>
            <Label style={styles.label}>Recurrence:</Label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              disabled={!isEditing}
              style={styles.select}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div style={styles.buttonGroup}>
            {isEditing && (
              <Button
                variant="outline"
                style={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
            <Button className="p-6"
              variant="primary"
              style={styles.saveButton}
              onClick={isEditing ? handleEditSchedule : () => setIsEditing(true)}
              disabled={loading}
            >
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  datePicker: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default EditScheduler;

