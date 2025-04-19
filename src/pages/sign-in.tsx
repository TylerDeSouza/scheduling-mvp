import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdTokenResult, signInWithEmailAndPassword } from 'firebase/auth';

import { CONFIG } from 'src/config-global';
import { firebaseAuth } from 'src/firebase';

import { SignInView } from 'src/sections/auth';

export default function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);

      // Fetch the ID token including custom claims
      const tokenResult = await getIdTokenResult(user);
      const role = tokenResult.claims.role as string;

      // Redirect based on role
      if (role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else if (role === 'agent') {
        navigate('/dashboard/agent', { replace: true });
      } else {
        navigate('/dashboard/client', { replace: true });
      }
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