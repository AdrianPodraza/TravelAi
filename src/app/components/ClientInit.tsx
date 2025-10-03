// ClientInit.tsx
'use client';
import { useEffect } from 'react';
import { usePuterStore } from '../lib/puter';

export default function ClientInit() {
  const { init } = usePuterStore();
  useEffect(() => {
    init();
  }, []);
  return null;
}
