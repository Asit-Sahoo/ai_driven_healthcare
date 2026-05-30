import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './pages/UserContext'; // Import the useUser hook



const Login = () => {
  const { login } = useUser(); // Get the login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('email').focus(); // Auto-focus the email input
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    const requestBody = {
      email,
      password,
      isUser: role === 'User' ? 1 : 0,
      isDoctor: role === 'Doctor' ? 1 : 0,
      isAdmin: role === 'Admin' ? 1 : 0,
    };

    try {
      console.log(requestBody);
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      // const response = await fetch('http://localhost:5000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestBody),
      //   credentials: 'include',
      // });
      

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        login(data); // Pass full user object
         // Redirect based on user role
        
         if (data.isAdmin) {
          
          navigate('/admin-dashboard'); // Navigate to admin dashboard
        } 
        else if(data.isDoctor){
          console.log("helo");
          navigate('/doctor-dashboard');
        }else {
          //console.log('hello asit');
          navigate('/'); // Navigate to home page
        }
      } else {
        setError(data.message || 'Login failed');
        setPassword(''); // Clear password on error
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.header}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        {loading && <p style={styles.loading}>Logging in...</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Role:</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="User"
                  checked={role === 'User'}
                  onChange={(e) => setRole(e.target.value)}
                  style={styles.radioInput}
                />
                <span style={role === 'User' ? styles.radioChecked : styles.radioCircle}></span>
                User
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="Doctor"
                  checked={role === 'Doctor'}
                  onChange={(e) => setRole(e.target.value)}
                  style={styles.radioInput}
                />
                <span style={role === 'Doctor' ? styles.radioChecked : styles.radioCircle}></span>
                Doctor
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  value="Admin"
                  checked={role === 'Admin'}
                  onChange={(e) => setRole(e.target.value)}
                  style={styles.radioInput}
                />
                <span style={role === 'Admin' ? styles.radioChecked : styles.radioCircle}></span>
                Admin
              </label>
            </div>
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.signupPrompt}>
          Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  // Existing styles...
    pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: '60px',
  },
  container: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  loading: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '95%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  signupPrompt: {
    textAlign: 'center',
    marginTop: '15px',
  },
  signupLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '8px',
  },
  radioInput: {
    display: 'none', // Hide the default radio button
  },
  radioCircle: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid #007bff',
  },
  radioChecked: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    border: '2px solid #007bff',
  },
};

export default Login;




