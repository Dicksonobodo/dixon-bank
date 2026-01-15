import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { formatCurrency } from '../utils/formatters';

export const useBalance = () => {
  const { userData } = useAuth();

  const balance = useMemo(() => {
    return userData?.balance || { USD: 0, GBP: 0, EUR: 0 };
  }, [userData]);

  const defaultCurrency = useMemo(() => {
    return userData?.defaultCurrency || 'USD';
  }, [userData]);

  const getBalance = (currency) => {
    return balance[currency] || 0;
  };

  const getFormattedBalance = (currency) => {
    return formatCurrency(balance[currency] || 0, currency);
  };

  const getTotalBalanceInUSD = async () => {
    // This would need currency conversion
    // For now, just return USD balance
    return balance.USD || 0;
  };

  return {
    balance,
    defaultCurrency,
    getBalance,
    getFormattedBalance,
    getTotalBalanceInUSD
  };
};