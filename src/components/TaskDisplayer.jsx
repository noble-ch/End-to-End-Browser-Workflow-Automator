import { useEffect, useState } from 'react';
import Link from 'next/link';  // Import Next.js Link component

function RecordsList() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecords() {
        try {
          const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      
          if (!token) {
            setError('No token found, please login');
            return;
          }
      
          const res = await fetch('/api/getRecords', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include token in Authorization header
            },
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setRecords(data.data); // Store the records in state
          } else {
            setError(data.error || 'Failed to fetch records'); // Handle errors
          }
        } catch (err) {
          setError(err.message || 'An error occurred'); // Catch other errors
        }
      }
      
    fetchRecords(); // Call function on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Records List</h1>
      {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>} {/* Display error message */}
      <ul className="space-y-6">
        {records.map((record) => (
          <li key={record._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-700 hover:text-blue-900 transition-colors">{record.title}</h3>
            <p className="text-gray-600 mt-3">{record.description}</p>
            <div className="mt-4">
              <Link href={`/records/${record._id}`} passHref>
                <button className="inline-block text-white bg-blue-400 py-2 px-6 rounded-lg text-lg hover:bg-blue-500 transition-all">
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordsList;


