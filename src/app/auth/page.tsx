import React, { Suspense } from 'react';
import AuthClient from './AuthClient';

export const dynamic = 'force-dynamic'; // still needed for auth redirects

export default function AuthPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <Suspense fallback={<p>Loading authentication...</p>}>
        <AuthClient />
      </Suspense>
    </main>
  );
}
