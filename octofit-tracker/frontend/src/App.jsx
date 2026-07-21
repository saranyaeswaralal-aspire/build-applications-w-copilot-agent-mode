import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold">Modern fitness tracking for teams</h1>
        <p className="text-muted">Set VITE_CODESPACE_NAME in .env.local for Codespaces-aware API URLs.</p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2>Welcome</h2>
        <p className="text-muted">
          Use the navigation above to browse users, teams, activities, the leaderboard, and workouts.
        </p>
        <p className="mb-0">
          API URLs use VITE_CODESPACE_NAME when available and fall back to localhost when it is not set.
        </p>
      </div>
    </section>
  );
}

export default App;
