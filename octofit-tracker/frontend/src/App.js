import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand-wrapper">
            <img src="/octofitapp-small.png" alt="Octofit Logo" className="navbar-logo" />
            <span className="navbar-brand mb-0 h1">Octofit Tracker</span>
          </div>
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
                <a className="nav-link" href="#activities">
                  Activities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#leaderboard">
                  Leaderboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#teams">
                  Teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#users">
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#workouts">
                  Workouts
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="App-header">
        <h1>Welcome to Octofit Tracker!</h1>
        <p>Track your fitness journey and compete with your team</p>
      </header>
    </div>
  );
}

export default App;
