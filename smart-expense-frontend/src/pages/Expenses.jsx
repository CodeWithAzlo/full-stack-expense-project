import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import '../styles/Expenses.css';


export default function Expenses() {
  const { user, logout } = useAuthStore();
  const [form, setForm] = useState({ amount: '', category: '', description: '', date: '' });
  const queryClient = useQueryClient();

  // Fetch expenses
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const res = await api.get('/expenses');
      // The backend returns an array directly
      return Array.isArray(res.data) ? res.data : res.data.expenses || [];
    },
  });

  // Add expense
  const addExpense = useMutation({
    mutationFn: async () => await api.post('/expenses', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setForm({ amount: '', category: '', description: '', date: '' });
    },
  });

  // Delete expense
  const deleteExpense = useMutation({
    mutationFn: async (id) => await api.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return alert('Please fill all fields');
    addExpense.mutate();
  };

  if (isLoading) return <p>Loading expenses...</p>;

  return (
  <div className="expense-container">
    <div className="expense-header">
      <h2>Welcome, {user?.name}</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>

    <h3>Add Expense</h3>
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <button type="submit">➕ Add Expense</button>
    </form>

    <h3 style={{ marginTop: '30px' }}>Your Expenses</h3>
    {expenses.length === 0 ? (
      <p>No expenses yet.</p>
    ) : (
      <ul className="expense-list">
        {expenses.map((exp) => (
          <li key={exp._id} className="expense-item">
            <span>
              💸 <b>{exp.category}</b> — {exp.amount} PKR <br />
              <small>{exp.description}</small>
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteExpense.mutate(exp._id)}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

}
