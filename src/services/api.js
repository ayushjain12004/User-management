const API_BASE = 'https://jsonplaceholder.typicode.com';

export const userAPI = {
  async getUsers() {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async createUser(userData) {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  async updateUser(id, userData) {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.json();
  },
};