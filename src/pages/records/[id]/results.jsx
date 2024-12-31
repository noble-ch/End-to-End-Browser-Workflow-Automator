// pages/records/[recordId]/results.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecordResults() {
  const [executionResults, setExecutionResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { recordId } = router.query;

  useEffect(() => {
    if (!recordId) return;

    async function fetchExecutionResults() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/getExecutionResults?recordId=${recordId}`
        );
        const data = await res.json();

        console.log("Execution results fetched from backend:", data); // Log the response from API

        if (res.ok) {
          setExecutionResults(data);
        } else {
          setError(data.error || "Failed to fetch execution results");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchExecutionResults();
  }, [recordId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back to Record Details Button */}
      <div className="my-4">
        <Link href={`/records/${recordId}`}>
          <Button variant="outline" className="flex items-center">
            Back to Record
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-semibold mb-6">
        Execution Results for Record {recordId}
      </h1>

      {executionResults.length > 0 ? (
        executionResults.map((result) => (
          <div key={result.runId} className="mb-8">
            {/* Render execution results */}
          </div>
        ))
      ) : (
        <p>No execution results found for this record.</p>
      )}
    </div>
  );
}
