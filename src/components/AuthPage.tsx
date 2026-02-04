'use client';

import { useState, FormEvent } from 'react';
import { signUp, signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (authError) {
        setError(authError.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center font-mono">
      <div className="w-full max-w-md p-8 bg-cyber-dark border-2 border-cyber-border">
        <h1 className="text-4xl font-bold text-cyber-border mb-2 text-center">
          [MISSION CONTROL]
        </h1>
        <p className="text-cyber-secondary text-center mb-8">
          {isSignUp ? 'CREATE OPERATIVE' : 'AUTHENTICATE'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cyber-border text-sm mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent focus:shadow-lg focus:shadow-cyber-accent"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-cyber-border text-sm mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cyber-bg border border-cyber-border px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent focus:shadow-lg focus:shadow-cyber-accent"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-500 p-3 text-red-200 text-sm">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-border text-cyber-bg font-bold py-2 hover:bg-cyber-accent hover:text-cyber-bg transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'PROCESSING...' : isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-cyber-border">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="w-full text-cyber-secondary hover:text-cyber-accent transition-colors text-sm"
          >
            {isSignUp
              ? 'Already have access? [SIGN IN]'
              : 'New operative? [SIGN UP]'}
          </button>
        </div>
      </div>
    </div>
  );
}
