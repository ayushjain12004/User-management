import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userAPI.getUser(id);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUser} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <div>
      <div className="page-header">
        <h1>User Details</h1>
        <p>Detailed information about {user.name}</p>
      </div>

      <div className="user-detail-card">
        <div className="detail-field">
          <div className="detail-label">Full Name</div>
          <div className="detail-value">{user.name}</div>
        </div>

        <div className="detail-field">
          <div className="detail-label">Username</div>
          <div className="detail-value">{user.username}</div>
        </div>

        <div className="detail-field">
          <div className="detail-label">Email</div>
          <div className="detail-value">
            <a href={`mailto:${user.email}`} className="user-email">
              {user.email}
            </a>
          </div>
        </div>

        <div className="detail-field">
          <div className="detail-label">Phone</div>
          <div className="detail-value">{user.phone}</div>
        </div>

        <div className="detail-field">
          <div className="detail-label">Website</div>
          <div className="detail-value">
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </div>
        </div>

        <div className="detail-field">
          <div className="detail-label">Company</div>
          <div className="detail-value">{user.company?.name}</div>
        </div>

        <div className="detail-field" style={{ borderBottom: 'none' }}>
          <div className="detail-label">Address</div>
          <div className="detail-value">
            {user.address?.street}, {user.address?.city}, {user.address?.zipcode}
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/users" className="btn btn-primary">
            Back to Users
          </Link>
          <button 
            onClick={() => navigate('/users')} 
            className="btn btn-edit"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;