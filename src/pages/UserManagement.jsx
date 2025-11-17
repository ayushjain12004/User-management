import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await userAPI.getUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await userAPI.createUser({
        ...userData,
        id: Date.now(),
        address: {
          street: '',
          city: '',
          zipcode: ''
        },
        company: {
          name: ''
        }
      });
      
      setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
      setShowForm(false);
      alert('User created successfully!');
    } catch (err) {
      alert('Error creating user: ' + err.message);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await userAPI.updateUser(editingUser.id, userData);
      setUsers(prev => 
        prev.map(user => 
          user.id === editingUser.id ? { ...updatedUser, id: editingUser.id } : user
        )
      );
      setEditingUser(null);
      alert('User updated successfully!');
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setIsDeleting(userId);
      await userAPI.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleCancelCreate = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>User Management</h1>
        <p>Create, edit, and manage your users efficiently</p>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={fetchUsers} />
      )}

      {!showForm && !editingUser && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-submit"
          >
            Create New User
          </button>
        </div>
      )}

      {showForm && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={handleCancelCreate}
          isEditing={false}
        />
      )}

      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleUpdateUser}
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}

export default UserManagement;