import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function RecordDetail() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getRecordById?id=${id}`);
        const data = await res.json();

        if (res.ok) {
          setRecord(data.data);
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
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-semibold text-gray-800">
              {record.title}
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {record.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Generated Description:</strong>{" "}
              {record.generatedDescription ||
                "No generated description available"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>User:</strong> {record.user}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Created At:</strong>{" "}
              {new Date(record.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Updated At:</strong>{" "}
              {new Date(record.updatedAt).toLocaleString()}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">File</h2>
            {record.file ? (
              <div>
                <p className="text-gray-700 mb-2">
                  <strong>Filename:</strong> {record.file.filename}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Content Type:</strong> {record.file.contentType}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Path:</strong>{" "}
                  <Link
                    href={`/api/download?filename=${encodeURIComponent(
                      record.file.filename
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download File
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-gray-700">No file available</p>
            )}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecordDetail;
