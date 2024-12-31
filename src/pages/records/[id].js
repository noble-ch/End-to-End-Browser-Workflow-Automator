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
import { ArrowLeft } from "lucide-react";
import DescriptionDisplayer from "@/components/DescriptionDisplayer";

function RecordDetail() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aIGeneratedCode, setAIGeneratedCode] = useState(null);
  const [geminiResponseData, setGeminiResponseData] = useState(null);
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

  useEffect(() => {
    // Automatically run the AI code generation after the record is fetched
    if (record && record.file) {
      getAIGeneratedCode();
    }
  }, [record]); // This effect will run whenever `record` is updated

  const getAIGeneratedCode = async () => {
    if (!record || !record.file) {
      setError("No file available for processing.");
      return;
    }
    setLoading(true);
    setError(null);
    setGeminiResponseData(null);
    try {
      const fileContent = record.file.content;

      if (!fileContent) {
        setError("File content is missing.");
        return;
      }
      const geminiResponse = await fetch("/api/geminicode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: fileContent,
          recordId: id,
        }),
      });

      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error! Status: ${geminiResponse.status}`);
      }

      const geminiData = await geminiResponse.json();
      const puppeteerScript =
        geminiData?.script || "No Puppeteer script found.";

      setGeminiResponseData(geminiData);
      setAIGeneratedCode(puppeteerScript);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAIGeneratedCode = async () => {
    if (!aIGeneratedCode) {
      setError("No Puppeteer code to run.");
      return;
    }

    setLoading(true);

    try {
      const execResponse = await fetch("/api/executePuppeteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: aIGeneratedCode,
          scriptId: geminiResponseData.id,
          recordId: id,
        }),
      });

      if (!execResponse.ok) {
        throw new Error(`Execution error! Status: ${execResponse.status}`);
      }

      const execResult = await execResponse.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back to Dashboard Button */}
      <div className="my-4">
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-semibold text-gray-800">
              {record.title}
            </h1>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Card for Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {record.description}
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

        {/* Right Column - Card for Generated Description */}
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 mb-2">
                <DescriptionDisplayer id={ id } />
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Display generated Puppeteer code */}
      {/* {aIGeneratedCode && (
        <div>
          <h2 className="text-xl font-semibold">Generated Puppeteer Code</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {aIGeneratedCode}
          </pre>
        </div>
      )} */}

      {/* Button to show output results */}
      <div className="my-4">
        <Link href={`${id}/results/`}>
          <Button variant="outline" className="flex items-center">
            Show Output Results
          </Button>
        </Link>
      </div>

      <Button onClick={handleRunAIGeneratedCode} disabled={loading}>
        {loading ? "Running..." : "Run Puppeteer"}
      </Button>
    </div>
  );
}

export default RecordDetail;
