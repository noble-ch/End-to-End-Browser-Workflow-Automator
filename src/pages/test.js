import { useState } from 'react';

/**
 * TestGeminiAPI component
 * This page demonstrates how to make a POST request to the Gemini API
 * using the fetch API in a React component.
 * 
 */

export default function TestGeminiAPI() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to format response and handle new lines
  const formatResponse = (responseText) => {
    if (!responseText) return null;
    // Replace newline characters with <br />
    return responseText.split('\n').map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  return (
    <div>
      <h1>Test Gemini API</h1>
      <button onClick={handleTestAPI} disabled={loading}>
        {loading ? 'Loading...' : 'Send Request'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && (
        <div>
          <h2>API Response:</h2>
          <div>{formatResponse(JSON.stringify(response, null, 2))}</div>
        </div>
      )}
    </div>
  );
}
