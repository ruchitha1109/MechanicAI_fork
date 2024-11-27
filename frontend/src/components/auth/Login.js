
// import './auth.css';
// import React, { useState } from 'react';
// import { account } from './appwrite'; // Importing the Appwrite account object

// const Login = ({ onLogin, onSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Using Appwrite to log the user in
//       await account.createEmailPasswordSession(email, password);
//       onLogin(true);
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <button onClick={onSignup}>Sign Up</button>
//       </p>
//     </div>
//   );
// };

// export default Login;










import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from './appwrite';
import './auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      onLogin(true);
      navigate('/'); // Redirect to the main page
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;