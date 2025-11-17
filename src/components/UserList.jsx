import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users, onEdit, onDelete, isDeleting }) {
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <div className="user-header">
            <div>
              <h3 className="user-name">{user.name}</h3>
              <a href={`mailto:${user.email}`} className="user-email">
                {user.email}
              </a>
            </div>
            <div className="user-actions">
              <Link to={`/users/${user.id}`} className="btn btn-primary">
                View
              </Link>
              <button 
                onClick={() => onEdit(user)} 
                className="btn btn-edit"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(user.id)} 
                className="btn btn-delete"
                disabled={isDeleting === user.id}
              >
                {isDeleting === user.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <p className="user-phone">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserList;