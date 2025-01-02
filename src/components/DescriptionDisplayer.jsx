"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { Plus, Trash2, ArrowDownIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DescriptionDisplayer({ id }) {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getDescription?id=${id}`);
        const data = await res.json();
        if (res.ok) {
          setRecord(data.data);
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
  }, [id]);

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
        setIsEditing(false);
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
    <div>
      <Card>
        <CardHeader>
          {!isEditing && (
            <p className=" text-gray-500">
              <strong>Note:</strong> You can edit the description in each
              textarea directly by clicking on{" "}
              <Edit size={16} className="inline text-gray-400" /> . <br />
              Use the
              <Plus size={18} className="inline text-gray-400" />
              button to add a new line or the{" "}
              <Trash2 size={15} className="inline text-gray-400 p-0 m-0" />{" "}
              button to delete an existing line.
            </p>
          )}
          <div className="flex justify-between">
            <CardTitle className="mt-2">Generated Description:</CardTitle>
            {!isEditing && (
              <Button className="w-4 h-1/4" onClick={() => setIsEditing(true)}>
                <Edit />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="max-h-[340px] p-1  overflow-auto">
          {record ? (
            <>
              {updatedDescription.map((line, index) => (
                <div
                  className="grid grid-cols-1 mb-4 text-gray-800 "
                  key={index}
                >
                  {isEditing ? (
                    <div className="grid grid-cols-12 mb-4">
                      <Textarea
                        value={line}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        rows={1}
                        className="col-span-10 resize-none min-h-[40px] overflow-hidden p-2 border rounded shadow-sm"
                        style={{ height: "auto" }}
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />

                      <div className="col-span-2 grid grid-rows-2 grid-cols-1 justify-center mb-2 mx-4 ">
                        <Button
                          type="button"
                          onClick={() => handleRemoveTextarea(index)}
                          size={16}
                          className="bg-red-500"
                        >
                          <Trash2 className="inline" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleAddTextarea(index)}
                          size={16}
                          className=""
                        >
                          <Plus className=" inline" />
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
            </>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
        {isEditing && (
          <Button className="flex" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Card>
    </div>
  );
}

export default DescriptionDisplayer;
