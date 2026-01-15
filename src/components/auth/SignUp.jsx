import { useState } from 'react';
import { signUpWithEmail, signInWithGoogle } from '../../services/authService';
import { validateEmail, validatePassword, validateUsername, validateDisplayName } from '../../utils/validators';
import { checkUsernameExists } from '../../services/userService';

export const SignUp = ({ onSuccess, onToggle }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const displayNameError = validateDisplayName(formData.displayName);
    const usernameError = validateUsername(formData.username);

    const validationErrors = {};

    if (emailError) validationErrors.email = emailError;
    if (passwordError) validationErrors.password = passwordError;
    if (displayNameError) validationErrors.displayName = displayNameError;
    if (usernameError) validationErrors.username = usernameError;

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Check if username exists
    const usernameExists = await checkUsernameExists(formData.username);
    if (usernameExists) {
      setErrors({ username: 'Username already taken' });
      setLoading(false);
      return;
    }

    const { user, error } = await signUpWithEmail(
      formData.email,
      formData.password,
      formData.displayName,
      formData.username
    );

    if (error) {
      setGeneralError(error);
      setLoading(false);
    } else if (user) {
      onSuccess();
    }
  };

  const handleGoogleSignUp = async () => {
    setGeneralError('');
    
    if (!formData.username) {
      setErrors({ username: 'Please enter a username before signing up with Google' });
      return;
    }

    const usernameError = validateUsername(formData.username);
    if (usernameError) {
      setErrors({ username: usernameError });
      return;
    }

    setLoading(true);

    const usernameExists = await checkUsernameExists(formData.username);
    if (usernameExists) {
      setErrors({ username: 'Username already taken' });
      setLoading(false);
      return;
    }

    const { user, error } = await signInWithGoogle(formData.username);

    if (error) {
      setGeneralError(error);
      setLoading(false);
    } else if (user) {
      onSuccess();
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2C2E2F', marginBottom: '8px' }}>
        Create Account
      </h2>
      <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>
        Join PayBank and start managing your money
      </p>

      {generalError && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px'
          }}
        >
          <p style={{ color: '#DC3545', fontSize: '14px', margin: 0 }}>
            {generalError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Display Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
            Full Name
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.displayName ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.displayName && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.displayName}</p>
          )}
        </div>

        {/* Username */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.username ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.username && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.email ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.email && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.password ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.password && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2C2E2F', marginBottom: '6px' }}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.confirmPassword ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#6C757D' : '#0070BA',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        <span style={{ padding: '0 16px', color: '#6C757D', fontSize: '12px' }}>OR</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
      </div>

      {/* Google Sign Up */}
      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#2C2E2F'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.335z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
        </svg>
        Continue with Google
      </button>
      
      <p style={{ marginTop: '12px', fontSize: '12px', color: '#6C757D', textAlign: 'center' }}>
        * Please enter a username before using Google sign up
      </p>

      {/* Toggle to Sign In */}
      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6C757D' }}>
        Already have an account?{' '}
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#0070BA',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};