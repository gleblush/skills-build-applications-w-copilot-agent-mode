import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched users data:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed users:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading users...</p>
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
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="bi bi-people-fill"></i> Users Management
          </h3>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No users found. Start by creating new user profiles.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '60px' }}>ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="text-center">{user.id}</td>
                      <td>
                        <span className="badge bg-info text-dark">{user.username}</span>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.first_name || <span className="text-muted">-</span>}</td>
                      <td>{user.last_name || <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light text-muted text-center">
          Total Users: <strong>{users.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Users;
