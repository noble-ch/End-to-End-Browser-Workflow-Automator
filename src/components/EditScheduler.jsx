import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditScheduler({ aIGeneratedCode, recordId, scriptId }) {
  const [scheduledTime, setScheduledTime] = useState("");
  const [recurrence, setRecurrence] = useState("once");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (scriptId) {
      fetch(`/api/schedulePuppeteer?scriptId=${scriptId}`)
        .then((response) => response.json())
        .then((data) => {
          setScheduledTime(data.scheduledTime);
          setRecurrence(data.recurrence || "once");
        })
        .catch((error) => console.error("Error fetching scheduler:", error));
    }
  }, [scriptId]);

  const handleEditSchedule = async () => {
    try {
      const response = await fetch(`/api/schedulePuppeteer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduledTime,
          aIGeneratedCode,
          recordId,
          scriptId,
          recurrence,
        }),
      });

      if (response.ok) {
        alert("Scheduler updated successfully!");
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update scheduler.");
      }
    } catch (error) {
      alert("An error occurred.");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Edit Scheduler</h3>
      <label>
        Scheduled Time:
        <DatePicker
          selected={scheduledTime ? new Date(scheduledTime) : null}
          onChange={(date) => setScheduledTime(date.toISOString())}
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
      <button onClick={() => setIsEditing(!isEditing)}>
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
