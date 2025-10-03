'use client';

import React, { useEffect } from 'react';
import { usePuterStore } from '../lib/puter';
import { useRouter, useSearchParams } from 'next/navigation';

function Auth() {
  const { isLoading, auth } = usePuterStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const nextPath = searchParams.get('next') || '/';

  useEffect(() => {
    if (auth.isAuthenticated) router.replace(nextPath);
  }, [auth.isAuthenticated, nextPath, router]);

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <section className="flex flex-col gap-8 rounded-2xl bg-white p-10 text-black shadow-lg">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold">Welcome</h1>
          <h2 className="text-lg">Log in to plan your next trip</h2>
        </div>

        <div>
          {isLoading ? (
            <button className="rounded bg-gray-300 px-4 py-2 text-sm" disabled>
              Signing you in...
            </button>
          ) : auth.isAuthenticated ? (
            <button
              className="rounded bg-red-500 px-4 py-2 text-white"
              onClick={() => auth.signOut().then(() => router.replace('/auth'))}
            >
              Log out
            </button>
          ) : (
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => auth.signIn().then(() => router.push(nextPath))}
            >
              Log in
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Auth;
