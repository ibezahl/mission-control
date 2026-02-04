'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import KanbanBoard from '@/components/KanbanBoard';

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await getCurrentUser();
        if (error || !data?.user) {
          router.push('/');
          return;
        }
        setUserId(data.user.id);
        setUserEmail(data.user.email || '');
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (isLoading || !userId) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center text-cyber-border font-mono">
        [LOADING OPERATIVE PROFILE...]
      </div>
    );
  }

  return (
    <div>
      <div className="bg-cyber-dark border-b-2 border-cyber-border p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyber-border">
          [MISSION CONTROL - OPERATIVE: {userEmail.toUpperCase()}]
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors cursor-pointer font-mono font-bold"
        >
          LOGOUT
        </button>
      </div>
      <KanbanBoard userId={userId} />
    </div>
  );
}
