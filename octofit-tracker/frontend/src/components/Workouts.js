import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
        const apiUrl = `${codespaceUrl}/api/workouts/`;
        
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || data;
        console.log('Processed Workouts data:', workoutsList);
        
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
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
        <div className="alert alert-info" role="alert">
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Loading workouts...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error loading workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="mb-2">💪 Workouts</h2>
        <p className="text-muted">Browse available workout programs and routines</p>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No workouts available</h5>
          <p>Check back soon for new workout programs and fitness routines.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workout Name</th>
                <th>Type</th>
                <th className="text-center">Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td><span className="badge bg-primary">{workout._id}</span></td>
                  <td>
                    <strong>{workout.workout || 'N/A'}</strong>
                  </td>
                  <td><span className="badge bg-secondary">{workout.reps || 0} reps</span></td>
                  <td className="text-center">💪 Exercise</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;
