import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import "../styles/AdminUsers.css";

export default function AdminUsers() {
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await api.get('/users')).data,
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => await api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  if (isLoading) return <p className="loading-text">Loading users...</p>;

  return (
    <div className="admin-wrapper">
      <div className="admin-card">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subtitle">
          Welcome, <span>{user?.name}</span> ({user?.role})
        </p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <h3 className="users-title">All Users</h3>
        {users.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <ul className="users-list">
            {users.map((u) => (
              <li key={u._id} className="user-item">
                👤 <b>{u.name}</b> — {u.email} ({u.role})
                <button
                  className="delete-btn"
                  onClick={() => deleteUser.mutate(u._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
