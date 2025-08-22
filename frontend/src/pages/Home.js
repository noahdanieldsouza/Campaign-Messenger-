import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessageAnalytics } from '../api/messages'; // Adjust path as needed
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const Home = () => {
  const navigate = useNavigate();

  // State variables
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  // Load analytics data on mount
  useEffect(() => {
    getMessageAnalytics()
      .then(res => setAnalytics(res.data))
      .catch(err => {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to load analytics.';
        setError(errorMsg);
      });
  }, []);

  // Prepare data for messages by date line chart
  const messagesByDateData = analytics
    ? Object.entries(analytics.messagesByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

  // Prepare data for top contacts bar chart
  const topContactsData = analytics
    ? analytics.topContacts.map(({ name, message_count }) => ({
        name,
        messages: Number(message_count)
      }))
    : [];

  return (
    <div className="home-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2em' }}>
      <h1 style={{ textAlign: 'center' }}>AI Powered Outreach System</h1>

      {/* Navigation Buttons */}
      <div
        className="options"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1em',
          marginBottom: '2em',
          flexWrap: 'wrap'
        }}
      >
        <button onClick={() => navigate('/create-contact')}>Create New Contact</button>
        <button onClick={() => navigate('/edit-contact')}>Edit Existing Contact</button>
        <button onClick={() => navigate('/message-contact')}>Message a Contact</button>
      </div>

      {/* Analytics Section */}
      <div className="analytics">
        <h2>📊 Message Analytics</h2>

        {/* Error Display */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Loading state */}
        {!analytics ? (
          <p>Loading analytics...</p>
        ) : (
          <>
            {/* Total messages summary */}
            <p><strong>Total Messages Sent:</strong> {analytics.totalMessages}</p>

            {/* Messages Over Time Line Chart */}
            <h3>Messages Sent Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={messagesByDateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Messages Sent"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Top Contacts Bar Chart */}
            <h3 style={{ marginTop: '2em' }}>Top Contacts by Message Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topContactsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="messages" name="Messages Sent" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;


