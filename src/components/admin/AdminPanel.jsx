import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/userService';
import { UserList } from './UserList';
import { AddBalance } from './AddBalance';
import { Loader } from '../common/Loader';

export const AdminPanel = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Check if user is admin
    if (userData && !userData.isAdmin) {
      navigate('/');
      return;
    }

    const loadUsers = async () => {
      const { users: allUsers, error } = await getAllUsers();

      if (isMounted) {
        if (!error && allUsers) {
          setUsers(allUsers);
        }
        setLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [userData, navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowAddBalance(true);
  };

  const handleBalanceAdded = async () => {
    // Reload users to get updated balances
    setLoading(true);
    const { users: allUsers, error } = await getAllUsers();

    if (!error && allUsers) {
      setUsers(allUsers);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.displayName?.toLowerCase().includes(search) ||
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.accountNumber?.toLowerCase().includes(search)
    );
  });

  if (!userData?.isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
        <p style={{ color: '#DC3545', fontSize: '18px', fontWeight: '600' }}>
          Access Denied
        </p>
        <p style={{ color: '#6C757D', fontSize: '14px' }}>
          You don't have permission to access this page
        </p>
      </div>
    );
  }

  if (loading) {
    return <Loader text="Loading users..." />;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#2C2E2F', marginBottom: '8px' }}>
          Admin Panel
        </h1>
        <p style={{ color: '#6C757D', fontSize: '14px' }}>
          Manage users and add balance to accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 8px 0', fontWeight: '500' }}>
            Total Users
          </p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#0070BA', margin: 0 }}>
            {users.length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 8px 0', fontWeight: '500' }}>
            Admin Users
          </p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#28A745', margin: 0 }}>
            {users.filter(u => u.isAdmin).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 8px 0', fontWeight: '500' }}>
            Regular Users
          </p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#6C757D', margin: 0 }}>
            {users.filter(u => !u.isAdmin).length}
          </p>
        </div>
      </div>

      {/* Search & User List */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, username, email, or account number..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <UserList users={filteredUsers} onSelectUser={handleSelectUser} />
      </div>

      {/* Add Balance Modal */}
      <AddBalance
        user={selectedUser}
        isOpen={showAddBalance}
        onClose={() => {
          setShowAddBalance(false);
          setSelectedUser(null);
        }}
        onSuccess={handleBalanceAdded}
      />
    </div>
  );
};