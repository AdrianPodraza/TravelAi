'use client';

import Image from 'next/image';
import FormTravel from './components/FormTravel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePuterStore } from './lib/puter';

export default function Home() {
  const { auth } = usePuterStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image
        className="-z-10"
        fill
        objectFit="cover"
        src={'/bg-hero.jpg'}
        alt={'background image'}
      />
      <FormTravel />
    </div>
  );
}
