import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetails';
import UserManagement from './pages/UserManagement';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            UserManager
          </Link>
          <div className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/users" className="nav-link">
              Manage Users
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;