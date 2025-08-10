import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch history logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="loading">Loading History...</div>;
  }

  return (
    <div className="history-container">
      <h2>Analysis History</h2>
      {logs.length === 0 ? (
        <p>No past analyses found.</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} className="log-card">
            <p><strong>Filename:</strong> {log.filename}</p>
            <p><strong>Caption:</strong> "{log.caption}"</p>
            <p><strong>Date:</strong> {new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;