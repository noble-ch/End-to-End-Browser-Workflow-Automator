import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DescriptionDisplayer({ id }) {
  const [record, setRecord] = useState(null); // State to store the record
  const [error, setError] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState([]); // To store updated lines of description
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getDescription?id=${id}`); // Fetch record using `id`
        const data = await res.json();
        if (res.ok) {
          setRecord(data.data); // Set the fetched record
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
    if (!record) {
      alert("Record ID is missing.");
      return;
    }
    try {
      const res = await fetch("/api/updatedDescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          updatedDescription,
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
      {!isEditing && (
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          <strong>Note:</strong> You can edit the text in each textarea
          directly. Use the "+" button to add a new line or the "-" button to
          delete an existing line.
        </p>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Generated Description:</CardTitle>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {record ? (
            <>
              {updatedDescription.map((line, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  {isEditing ? (
                    <div>
                      <Textarea
                        value={line}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        cols={100}
                        rows={3}
                        style={{
                          width: "100%",
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
                            width: "30px",
                            height: "30px",
                            padding: "0",
                            fontSize: "16px",
                          }}
                        >
                          +
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveTextarea(index)}
                          variant="destructive"
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: "0",
                            fontSize: "16px",
                          }}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>{line}</div>
                  )}
                </div>
              ))}
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(record.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(record.updatedAt).toLocaleString()}
              </p>
              {isEditing && (
                <Button
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "1rem",
                  }}
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DescriptionDisplayer;

