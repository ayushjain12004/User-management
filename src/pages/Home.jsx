import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="page-header">
        <h1>Welcome to UserManager</h1>
        <p>Efficiently manage your users with our powerful CRUD application</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gap: '2rem', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        marginTop: '3rem' 
      }}>
        <div className="user-card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>View Users</h3>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            Browse through all registered users and their details
          </p>
          <Link to="/users" className="btn btn-primary">
            Manage Users
          </Link>
        </div>

        <div className="user-card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>Features</h3>
          <ul style={{ textAlign: 'left', marginBottom: '1.5rem', color: '#666' }}>
            <li>Create new users</li>
            <li>Edit existing user information</li>
            <li>Delete users from the system</li>
            <li>View detailed user profiles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;