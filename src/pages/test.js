import { useState } from 'react';

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

  return (
    <div>
      <h1>Test Gemini API</h1>
      <button onClick={handleTestAPI} disabled={loading}>
        {loading ? 'Loading...' : 'Send Request'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
