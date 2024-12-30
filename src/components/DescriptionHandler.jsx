import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function DescriptionHandler() {
  const [record, setRecord] = useState(null); // State to store the record
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the task ID from the URL

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getDescription`); // API call with the ID
        const data = await res.json();

        if (res.ok) {
          setRecord(data.data); // Set the fetched record
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

  return (
    <div>
      {record ? (
        <div>
          <h1>{record.title}</h1>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Generated Description:</strong> {record.generatedDescription}</p>
          <p><strong>File Path:</strong> {record.file}</p>
          <p><strong>Created At:</strong> {new Date(record.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(record.updatedAt).toLocaleString()}</p>
        </div>
      ) : (
        <div>Loading...</div> // Show a loading state while fetching
      )}
    </div>
  );
}

export default DescriptionHandler;
