
// import './auth.css';
// import React, { useState } from 'react';
// import { account, ID } from './appwrite';  // Make sure to import ID from Appwrite

// const Signup = ({ onSignup, onCancel }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Generate a unique userId using Appwrite's ID.unique() method
//       const userId = ID.unique();  // Generate a valid userId

//       // Use the generated userId and email/password for creating the account
//       await account.create(userId, email, password);  // Create a new user with a valid userId
//       await account.createEmailPasswordSession(email, password); // Automatically login after signup

//       onSignup(true); // Successful signup and login, trigger the onSignup callback
//       alert('Signup successful! You are now logged in.');
//     } catch (error) {
//       console.error('Signup failed:', error);
//       alert('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
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
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an account? <button onClick={onCancel}>Login</button>
//       </p>
//     </div>
//   );
// };

// export default Signup;











import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, ID } from './appwrite';
import './auth.css';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = ID.unique();
      await account.create(userId, email, password);
      await account.createEmailPasswordSession(email, password);
      onSignup(true);
      navigate('/'); // Redirect to the main page
    } catch (error) {
      console.error('Signup failed:', error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
};

export default Signup;