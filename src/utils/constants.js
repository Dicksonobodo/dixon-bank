// Currency options
export const CURRENCIES = ['USD', 'GBP', 'EUR'];

export const CURRENCY_SYMBOLS = {
  USD: '$',
  GBP: '£',
  EUR: '€'
};

export const CURRENCY_NAMES = {
  USD: 'US Dollar',
  GBP: 'British Pound',
  EUR: 'Euro'
};

// PayPal blue color scheme
export const COLORS = {
  primary: '#0070BA',
  primaryHover: '#005EA6',
  primaryLight: '#E6F4FF',
  secondary: '#003087',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC439',
  dark: '#2C2E2F',
  gray: '#6C757D',
  lightGray: '#F5F7FA',
  white: '#FFFFFF'
};

// Transaction types
export const TRANSACTION_TYPES = {
  SENT: 'sent',
  RECEIVED: 'received'
};

// Transaction status
export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  FAILED: 'failed'
};

// Admin credentials (for route protection)
export const ADMIN_ROUTE = '/admin';

// Validation constants
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 20;
export const MIN_TRANSFER_AMOUNT = 0.01;