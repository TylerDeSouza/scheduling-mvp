// src/sections/auth/SignInView.tsx
import React, { useState } from 'react';

// Define the types for props
interface SignInViewProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
}

const SignInView: React.FC<SignInViewProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password); // Call onLogin when the form is submitted
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message if there is one */}
    </div>
  );
};

export { SignInView };