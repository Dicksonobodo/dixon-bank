import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } from './constants';

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
};

// Username validation
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  
  if (!username) return 'Username is required';
  if (username.length < MIN_USERNAME_LENGTH) {
    return `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
  }
  if (username.length > MAX_USERNAME_LENGTH) {
    return `Username must be less than ${MAX_USERNAME_LENGTH} characters`;
  }
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

// Display name validation
export const validateDisplayName = (name) => {
  if (!name) return 'Display name is required';
  if (name.length < 2) return 'Display name must be at least 2 characters';
  return null;
};

// Amount validation
export const validateAmount = (amount, balance, currency) => {
  const numAmount = parseFloat(amount);
  
  if (!amount) return 'Amount is required';
  if (isNaN(numAmount)) return 'Invalid amount';
  if (numAmount <= 0) return 'Amount must be greater than 0';
  if (numAmount > balance) return `Insufficient ${currency} balance`;
  
  return null;
};

// Recipient identifier validation (email, username, or account number)
export const validateRecipient = (identifier) => {
  if (!identifier) return 'Recipient is required';
  if (identifier.length < 3) return 'Invalid recipient';
  return null;
};

// General field validation
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};