import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.users || payload.data || [];
        setUsers(list);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name || user.email}</strong>
            <div className="text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
