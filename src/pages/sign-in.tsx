import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { CONFIG } from 'src/config-global';
import { firebaseAuth } from 'src/firebase';

import { SignInView } from 'src/sections/auth';

export default function Page() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate('/'); // redirect to home
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <title>{`Sign in - ${CONFIG.appName}`}</title>
      <SignInView onLogin={handleLogin} error={error} />
    </>
  );
}