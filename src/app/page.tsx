"use client";
// import { Suspense } from 'react';
// import Link from "next/link";
// import dynamic from 'next/dynamic';
// import Spinner from '@/components/spinner';
import Curosel from '@/components/curosel';

// Lazy load TestApi with loading state
// const TestApi = dynamic(() => import('@/components/api'), {
//   ssr: false,
//   loading: () => <Spinner />
// });

export default function Home() {
  return (
    <div>
      <Curosel />
      
      {/* <Suspense fallback={<Spinner />}>
        <TestApi />
      </Suspense> */}
    </div>
  );
}