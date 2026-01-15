import { CURRENCY_SYMBOLS } from './constants';

// Format currency amount
export const formatCurrency = (amount, currency = 'USD') => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const numAmount = parseFloat(amount) || 0;
  
  return `${symbol}${numAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// Format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
  return `${formattedDate} at ${formattedTime}`;
};

// Format date only
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format time only
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format account number (add spaces for readability)
export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  // Format as: ACC 123456 7890
  return accountNumber.replace(/(.{3})(.{6})(.{4})/, '$1 $2 $3');
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Format transaction type for display
export const formatTransactionType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Get relative time (e.g., "2 hours ago", "just now")
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  return formatDate(dateString);
};

// Format balance object for display
export const formatBalanceDisplay = (balance, currency) => {
  if (!balance) return formatCurrency(0, currency);
  return formatCurrency(balance[currency] || 0, currency);
};

// Capitalize first letter
export const capitalizeFirst = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};