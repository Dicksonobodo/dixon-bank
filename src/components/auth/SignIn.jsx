import { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validators';

export const SignIn = ({ onSuccess, onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Validate
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    setLoading(true);

    const { user, error } = await signInWithEmail(email, password);

    if (error) {
      setGeneralError(error);
      setLoading(false);
    } else if (user) {
      onSuccess();
    }
  };

  const handleGoogleSignIn = async () => {
    setGeneralError('');
    setLoading(true);

    const { user, error } = await signInWithGoogle();

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
        Welcome Back
      </h2>
      <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>
        Sign in to your account to continue
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
        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#2C2E2F',
              marginBottom: '6px'
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.email ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              if (!errors.email) e.target.style.borderColor = '#0070BA';
            }}
            onBlur={(e) => {
              if (!errors.email) e.target.style.borderColor = '#E5E7EB';
            }}
          />
          {errors.email && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#2C2E2F',
              marginBottom: '6px'
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: errors.password ? '1px solid #DC3545' : '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              if (!errors.password) e.target.style.borderColor = '#0070BA';
            }}
            onBlur={(e) => {
              if (!errors.password) e.target.style.borderColor = '#E5E7EB';
            }}
          />
          {errors.password && (
            <p style={{ color: '#DC3545', fontSize: '12px', marginTop: '4px' }}>
              {errors.password}
            </p>
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
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = '#005EA6';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = '#0070BA';
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        <span style={{ padding: '0 16px', color: '#6C757D', fontSize: '12px' }}>OR</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
      </div>

      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
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
          color: '#2C2E2F',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!loading) e.target.style.backgroundColor = '#F5F7FA';
        }}
        onMouseLeave={(e) => {
          if (!loading) e.target.style.backgroundColor = '#FFFFFF';
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

      {/* Toggle to Sign Up */}
      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6C757D' }}>
        Don't have an account?{' '}
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
          Sign Up
        </button>
      </p>
    </div>
  );
};