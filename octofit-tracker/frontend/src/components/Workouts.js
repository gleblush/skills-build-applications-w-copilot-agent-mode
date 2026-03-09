import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed workouts:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading workouts...</p>
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

  const getDifficultyColor = (difficulty) => {
    const level = difficulty?.toLowerCase() || 'unknown';
    if (level.includes('easy') || level.includes('beginner')) return 'success';
    if (level.includes('medium') || level.includes('intermediate')) return 'warning';
    if (level.includes('hard') || level.includes('advanced')) return 'danger';
    return 'secondary';
  };

  return (
    <div className="container-fluid px-4 py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-danger text-white">
          <h3 className="mb-0">
            <i className="bi bi-fire"></i> Personalized Workout Suggestions
          </h3>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No workout suggestions available at this time. Check back later for personalized recommendations!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '60px' }}>ID</th>
                    <th scope="col">Workout Title</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">Duration</th>
                    <th scope="col" className="text-center">Difficulty</th>
                    <th scope="col">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td className="text-center">{workout.id}</td>
                      <td>
                        <span className="badge bg-primary text-white">
                          {workout.title || workout.name || 'Unnamed Workout'}
                        </span>
                      </td>
                      <td>{workout.description || <span className="text-muted">-</span>}</td>
                      <td className="text-center">
                        {workout.duration ? <span className="badge bg-info">{workout.duration} min</span> : <span className="text-muted">-</span>}
                      </td>
                      <td className="text-center">
                        <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty || 'N/A'}
                        </span>
                      </td>
                      <td>{workout.created_date ? new Date(workout.created_date).toLocaleDateString() : <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-light text-muted text-center">
          <i className="bi bi-info-circle"></i> Total Workouts Available: <strong>{workouts.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
