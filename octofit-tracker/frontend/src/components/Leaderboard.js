import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed leaderboard:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="card border-danger">
          <div className="card-body">
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '🏅';
  };

  return (
    <div className="container-fluid px-4 py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-dark">
          <h3 className="mb-0">
            <i className="bi bi-trophy-fill"></i> Competitive Leaderboard
          </h3>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No leaderboard data available yet. Start competing to appear on the board!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '80px' }}>Rank</th>
                    <th scope="col">User</th>
                    <th scope="col" className="text-end">Score</th>
                    <th scope="col" className="text-center">Activities</th>
                    <th scope="col" className="text-end">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index} className={index < 3 ? 'table-light fw-bold' : ''}>
                      <td className="text-center text-lg">
                        <span className="me-2">{getMedalEmoji(index)}</span>
                        {index + 1}
                      </td>
                      <td>
                        <span className="badge bg-primary text-white">
                          {entry.user || entry.username || 'Unknown'}
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-success">
                          {entry.score || entry.points || 0} pts
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary">
                          {entry.activities_count || entry.activity_count || 0}
                        </span>
                      </td>
                      <td className="text-end">{entry.total_distance || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light text-muted text-center">
          <i className="bi bi-info-circle"></i> Top 3 Competitors Highlighted | Total Competitors: <strong>{leaderboard.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
