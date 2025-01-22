import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState(null);
  const [recurrence, setRecurrence] = useState("once");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch current job details if editing an existing schedule
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (scriptId) {
        const response = await fetch(`/api/schedulePuppeteer?scriptId=${scriptId}`);
        if (response.ok) {
          const data = await response.json();
          setScheduledTime(new Date(data.scheduledTime));
          setRecurrence(data.recurrence);
        }
      }
    };
    fetchJobDetails();
  }, [scriptId]);

  const handleEditSchedule = async () => {
    try {
      if (!aIGeneratedCode || !recordId || !scriptId) {
        alert("Required data is missing. Please check your input.");
        return;
      }

      const payload = {
        scheduledTime: scheduledTime ? scheduledTime.toISOString() : null,
        aIGeneratedCode,
        recordId,
        scriptId,
        recurrence,
      };

      const response = await fetch(`/api/schedulePuppeteer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Scheduler updated successfully!");
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update scheduler.");
      }
    } catch (error) {
      console.error("Error updating scheduler:", error);
      alert("An error occurred while updating the scheduler.");
    }
  };

  return (
    <div>
      <h3>Edit Scheduler</h3>
      <label>
        Scheduled Time:
        <DatePicker
          selected={scheduledTime}
          onChange={(date) => setScheduledTime(date)}
          showTimeSelect
          dateFormat="Pp"
          disabled={!isEditing}
        />
      </label>
      <label>
        Recurrence:
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          disabled={!isEditing}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <button onClick={isEditing ? handleEditSchedule : () => setIsEditing(true)}>
        {isEditing ? "Save Changes" : "Edit"}
      </button>
    </div>
  );
}

export default EditScheduler;




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
