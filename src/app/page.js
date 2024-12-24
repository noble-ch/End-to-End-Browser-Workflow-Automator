//pages.js
"use client";

import { useState } from 'react';

export default function Home() {
  const [record, setRecord] = useState('');
  const [prompt, setPrompt] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that both record and prompt are provided
    if (!record || !prompt) {
      setError('Both record and prompt are required.');
      return;
    }

    try {
      // Send a POST request to the backend with the record and prompt
      const response = await fetch('/api/sendRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record: JSON.parse(record), prompt }), // Convert record to JSON
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setDescription(data.description);
        setError('');
      } else {
        setError(data.error || 'An error occurred while processing your request');
        setResponseMessage('');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h1>Send Record and Prompt</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Record (JSON):</label>
          <textarea
            value={record}
            onChange={(e) => setRecord(e.target.value)}
            required
            placeholder='Enter your JSON record here'
          ></textarea>
        </div>
        <div>
          <label>Prompt:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            placeholder='Enter your prompt here'
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {responseMessage && (
        <div>
          <h3>Success!</h3>
          <p>{responseMessage}</p>
          <h4>Generated Description:</h4>
          <p>{description}</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
