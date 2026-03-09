import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched activities data:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed activities:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading activities...</p>
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
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">
            <i className="bi bi-lightning-fill"></i> Activity Tracking
          </h3>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No activities recorded yet. Start logging your fitness activities!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '60px' }}>ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col" className="text-end">Duration</th>
                    <th scope="col" className="text-end">Distance</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="text-center">{activity.id}</td>
                      <td>{activity.user || activity.user_id || <span className="text-muted">-</span>}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {activity.activity_type || 'Unknown'}
                        </span>
                      </td>
                      <td className="text-end">{activity.duration || <span className="text-muted">-</span>}</td>
                      <td className="text-end">{activity.distance || <span className="text-muted">-</span>}</td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString() : <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light text-muted text-center">
          Total Activities: <strong>{activities.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Activities;
