import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
        const apiUrl = `${codespaceUrl}/api/teams/`;
        
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || data;
        console.log('Processed Teams data:', teamsList);
        
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Loading teams...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error loading teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="mb-2">👥 Teams</h2>
        <p className="text-muted">Manage and view all fitness teams</p>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No teams found</h5>
          <p>Create a team to get started with group fitness challenges.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th className="text-center">Members</th>
                <th className="text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td><span className="badge bg-primary">{team._id}</span></td>
                  <td>
                    <strong>{team.name || 'N/A'}</strong>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-info">Team</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
