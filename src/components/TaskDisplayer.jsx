import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function RecordsList() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("No token found, please login");
          return;
        }

        const res = await fetch("/api/getRecords", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setRecords(data.data);
        } else {
          setError(data.error || "Failed to fetch records");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    }

    fetchRecords();
  }, []);

  return (
    <div>
      {error && <p className="text-red-600 mb-6 font-medium">{error}</p>}

      <Table className="table-auto w-full text-center rounded-lg border">
        <TableCaption>My Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{record.title}</TableCell>
              <TableCell>
                {new Date(record.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Link href={`/records/${record._id}`} passHref>
                  <Button variant="link" as="a">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RecordsList;
