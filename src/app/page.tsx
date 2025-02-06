"use client";
import { Suspense } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import Spinner from '@/components/spinner';

// Lazy load TestApi with loading state
const TestApi = dynamic(() => import('@/components/api'), {
  ssr: false,
  loading: () => <Spinner />
});

export default function Home() {
  return (
    <div>
      <h1>index page</h1>
      <Link href="/about">about</Link>
      
      <Suspense fallback={<Spinner />}>
        <TestApi />
      </Suspense>
    </div>
  );
}