import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token to API
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information.');
        }

        const userData = await response.json();
        setUser(userData); // Save user data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    router.push('/login'); // Redirect to the login page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <h2>User Information</h2>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
