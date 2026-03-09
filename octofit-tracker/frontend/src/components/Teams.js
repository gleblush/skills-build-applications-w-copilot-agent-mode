import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched teams data:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed teams:', teamsData);
        
        setTeams(teamsData);
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
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading teams...</p>
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

  return (
    <div className="container-fluid px-4 py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">
            <i className="bi bi-people-fill"></i> Team Management
          </h3>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No teams available. Create a team to start collaborating with other users!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '60px' }}>ID</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">Members</th>
                    <th scope="col">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="text-center">{team.id}</td>
                      <td>
                        <span className="badge bg-danger">
                          {team.name || team.team_name || 'Unnamed'}
                        </span>
                      </td>
                      <td>{team.description || <span className="text-muted">-</span>}</td>
                      <td className="text-center">
                        <span className="badge bg-secondary">
                          {team.members_count || team.members?.length || 0}
                        </span>
                      </td>
                      <td>{team.created_date ? new Date(team.created_date).toLocaleDateString() : <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light text-muted text-center">
          Total Teams: <strong>{teams.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Teams;
