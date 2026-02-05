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
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-cyber-dark border border-cyber-border rounded-xl shadow-sm">
        <h1 className="text-4xl font-semibold text-cyber-text mb-2 text-center">
          [MISSION CONTROL]
        </h1>
        <p className="text-cyber-secondary text-center mb-8">
          {isSignUp ? 'CREATE OPERATIVE' : 'AUTHENTICATE'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cyber-text text-sm mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cyber-dark border border-cyber-border px-4 py-2 text-cyber-text focus:border-cyber-accent focus:ring-2 focus:ring-cyber-accent/20"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-cyber-text text-sm mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cyber-dark border border-cyber-border px-4 py-2 text-cyber-text focus:border-cyber-accent focus:ring-2 focus:ring-cyber-accent/20"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 p-3 text-rose-700 text-sm rounded-md">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-accent text-cyber-bg font-semibold py-2 hover:brightness-95 transition-all disabled:opacity-50 cursor-pointer rounded-md"
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
