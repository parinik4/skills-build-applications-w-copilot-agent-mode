import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
        const apiUrl = `${codespaceUrl}/api/leaderboard/`;
        
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data;
        console.log('Processed Leaderboard data:', leaderboardList);
        
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
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
        <div className="alert alert-info" role="alert">
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Loading leaderboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error loading leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="mb-2">🏆 Leaderboard</h2>
        <p className="text-muted">Top performers in the OctoFit community</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No leaderboard data available</h5>
          <p>Leaderboard will be populated as users log activities.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th className="text-center">Rank</th>
                <th>User</th>
                <th className="text-center">Score</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td className="text-center">
                    {index === 0 ? (
                      <span className="badge bg-warning text-dark">🥇 1</span>
                    ) : index === 1 ? (
                      <span className="badge bg-secondary">🥈 2</span>
                    ) : index === 2 ? (
                      <span className="badge bg-danger">🥉 3</span>
                    ) : (
                      <span className="badge bg-primary">{index + 1}</span>
                    )}
                  </td>
                  <td>{entry.user || 'N/A'}</td>
                  <td className="text-center">
                    <span className="badge bg-success">{entry.score || 0}</span>
                  </td>
                  <td>{entry.team || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
