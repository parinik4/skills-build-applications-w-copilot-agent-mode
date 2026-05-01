import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App component loaded');
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="d-inline-block align-text-top me-2"
              />
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👨‍👩‍👧‍👦 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📊 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-5">
          <p>&copy; 2026 OctoFit Tracker. Track your fitness journey with the community.</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <div className="hero-section">
        <h1>🐙 Welcome to OctoFit Tracker</h1>
        <p className="lead">
          Track your fitness activities, manage teams, and compete on the leaderboard!
        </p>
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">📊 Activities</h5>
              <p className="card-text">
                Log and track all your fitness activities in one place.
              </p>
              <Link to="/activities" className="btn btn-primary btn-sm">
                View Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">👥 Users</h5>
              <p className="card-text">
                Connect with community members and build your fitness network.
              </p>
              <Link to="/users" className="btn btn-primary btn-sm">
                View Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">👨‍👩‍👧‍👦 Teams</h5>
              <p className="card-text">
                Create and manage teams for group fitness challenges.
              </p>
              <Link to="/teams" className="btn btn-primary btn-sm">
                View Teams
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">
                Explore our curated workout programs and routines.
              </p>
              <Link to="/workouts" className="btn btn-primary btn-sm">
                View Workouts
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">
                Compete and see how you rank against other users.
              </p>
              <Link to="/leaderboard" className="btn btn-primary btn-sm">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">🚀 Get Started</h5>
              <p className="card-text">
                Choose a section from the navigation to begin your fitness journey.
              </p>
              <button className="btn btn-success btn-sm" disabled>
                Ready?
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">How to Use OctoFit Tracker</h5>
            </div>
            <div className="card-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  <strong>Create or Join a Team:</strong> Connect with others and form teams for group challenges.
                </li>
                <li className="list-group-item">
                  <strong>Log Activities:</strong> Record your daily fitness activities with duration and intensity.
                </li>
                <li className="list-group-item">
                  <strong>Follow Workouts:</strong> Choose from our library of workout programs tailored to your goals.
                </li>
                <li className="list-group-item">
                  <strong>Compete:</strong> Climb the leaderboard and compete with your team members.
                </li>
                <li className="list-group-item">
                  <strong>Achieve Goals:</strong> Track your progress and celebrate your fitness achievements!
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
