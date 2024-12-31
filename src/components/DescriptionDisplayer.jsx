import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function DescriptionDisplayer({ id }) {
  const [record, setRecord] = useState(null); // State to store the record
  const [error, setError] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState([]); // To store updated lines of description
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  console.log("id", id);

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getDescription?id=${id}`); // Fetch record using `id`
        const data = await res.json();
        console.log("data", data);
        if (res.ok) {
          setRecord(data.data); // Set the fetched record
          // Initialize with fetched description, split by newline and trim unnecessary spaces
          setUpdatedDescription(
            data.data.generatedDescription
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
          );
        } else {
          setError(data.error || "Failed to fetch record details");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    }

    fetchRecord();
  }, [id]); // Re-run the effect when the `id` changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = async () => {
    console.log("Record ID:", id);
    console.log("record", record); // Log the record's ID to check
    if (!record) {
      alert("Record ID is missing.");
      return;
    }
    console.log("update", updatedDescription);
    try {
      const res = await fetch("/api/updatedDescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id, // Send the record's id
          updatedDescription, // Send the updated description
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Description updated successfully!");
        setIsEditing(false); // Disable editing after successful update
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the description.");
    }
  };

  const handleDescriptionChange = (e, index) => {
    const updatedLines = [...updatedDescription];
    updatedLines[index] = e.target.value;
    setUpdatedDescription(updatedLines);
  };

  const handleAddTextarea = (index) => {
    const updatedLines = [...updatedDescription];
    updatedLines.splice(index + 1, 0, ""); // Insert an empty line after the current index
    setUpdatedDescription(updatedLines);
  };

  const handleRemoveTextarea = (index) => {
    const updatedLines = [...updatedDescription];
    updatedLines.splice(index, 1); // Remove the line at the specified index
    setUpdatedDescription(updatedLines);
  };

  return (
    <div style={{ position: "relative", padding: "1rem" }}>
      {record ? (
        <div>
          {/* Show the note only if not in editing mode */}
          {isEditing && (
            <p style={{ marginBottom: "1rem", color: "#555" }}>
              <strong>Note:</strong> You can edit the text in each textarea
              directly. Use the "+" button to add a new line or the "-" button to
              delete an existing line.
            </p>
          )}
          <div>
            <strong>Generated Description:</strong>
            {updatedDescription.map((line, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                {isEditing ? (
                  // Show textareas with "+" and "-" buttons in editing mode
                  <div>
                    <Textarea
                      value={line}
                      onChange={(e) => handleDescriptionChange(e, index)} // Update the description on change
                      cols={100} // Adjust columns based on your preference
                      rows={3} // Adjust rows based on your preference
                      style={{
                        width: "100%", // Ensure Textarea is full width
                        boxSizing: "border-box",
                      }}
                    />
                    <div
                      style={{
                        marginTop: "0.5rem",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Button
                        type="button"
                        onClick={() => handleAddTextarea(index)}
                        style={{
                          width: "30px", // Adjust width
                          height: "30px", // Adjust height
                          padding: "0", // Remove additional padding
                          fontSize: "16px", // Adjust font size for the icon
                        }}
                      >
                        +
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleRemoveTextarea(index)}
                        variant="destructive"
                        style={{
                          width: "30px", // Adjust width
                          height: "30px", // Adjust height
                          padding: "0", // Remove additional padding
                          fontSize: "16px", // Adjust font size for the icon
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Show updated description text when not in editing mode
                  <div>{line}</div>
                )}
              </div>
            ))}
          </div>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(record.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(record.updatedAt).toLocaleString()}
          </p>
          <br/>
          {/* Show edit button when not in editing mode */}
          {!isEditing && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                onClick={() => setIsEditing(true)} // Enable editing mode
              >
                Edit
              </Button>
            </div>
          )}
          {isEditing && (
            <Button
              style={{
                position: "absolute",
                right: "0", // Align to the right
                bottom: "1rem", // Add spacing from the bottom
              }}
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      ) : (
        <div>Loading...</div> // Show a loading state while fetching
      )}
    </div>
  );
}

export default DescriptionDisplayer;
