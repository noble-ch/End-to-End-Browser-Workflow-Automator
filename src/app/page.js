"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleLearnMore = () => {
    alert('Learn more about Web Automation!');
  };

  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  const handleRegister = () => {
    router.push('/register'); // Navigate to the registration page
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Web Automation Platform</h1>
      <p>Empowering you with automated web workflows and interaction recording.</p>

      <div style={{ margin: '20px 0' }}>
        <button
          onClick={handleLearnMore}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 10px',
          }}
        >
          Learn More
        </button>

        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 10px',
          }}
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 10px',
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
