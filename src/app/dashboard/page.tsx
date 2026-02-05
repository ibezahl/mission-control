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
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center text-cyber-text">
        [LOADING OPERATIVE PROFILE...]
      </div>
    );
  }

  return (
    <div>
      <div className="bg-cyber-dark border-b border-cyber-border p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-cyber-text">
          [MISSION CONTROL - OPERATIVE: {userEmail.toUpperCase()}]
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-rose-500 text-white px-4 py-2 hover:bg-rose-600 transition-colors cursor-pointer font-semibold rounded-md"
        >
          LOGOUT
        </button>
      </div>
      <KanbanBoard userId={userId} />
    </div>
  );
}
