import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter for routing

function RecordDetail() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;  // Get the record ID from the URL

  useEffect(() => {
    if (!id) return; // If there is no id in the URL, do nothing

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/getRecordById?id=${id}`);
        const data = await res.json();

        if (res.ok) {
          setRecord(data.data);  // Set the fetched record
        } else {
          setError(data.error || 'Failed to fetch record details'); // Handle errors
        }
      } catch (err) {
        setError(err.message || 'An error occurred'); // Catch other errors
      }
    }

    fetchRecord(); // Fetch the record details when the component is mounted
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{record.title}</h1>
      <p className="text-gray-700">{record.description}</p>
      <h2 className="text-xl font-semibold mt-6">Generated Description</h2>
      <p className="text-gray-700 mt-2">{record.generatedDescription || 'No generated description available'}</p>
    </div>
  );
}

export default RecordDetail;
