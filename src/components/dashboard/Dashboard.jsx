import { useAuth } from '../../hooks/useAuth';
import { BalanceCard } from './BalanceCard';
import { QuickActions } from './QuickActions';
import { formatAccountNumber } from '../../utils/formatters';

export const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ marginBottom: '32px' }}>
        <h1 class="capitalize  text-[20px] sm:text-[24px] md:text-[28px]" style={{  fontWeight: '700', color: '#2C2E2F', marginBottom: '8px', }}>
          Welcome back, {userData?.displayName}
        </h1>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#6C757D' }}>
          <div>
            <span style={{ fontWeight: '500' }}>Username:</span> @{userData?.username}
          </div>
          <div>
            <span style={{ fontWeight: '500' }}>Account:</span> {formatAccountNumber(userData?.accountNumber)}
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div style={{ marginBottom: '24px' }}>
        <BalanceCard />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};