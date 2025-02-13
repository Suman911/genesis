// import { Suspense } from 'react';
// import Link from "next/link";
// import dynamic from 'next/dynamic';
// import Spinner from '@/components/spinner';
import Curosel from '@/components/curosel';
import Hero from '@/components/hero';

// Lazy load TestApi with loading state
// const TestApi = dynamic(() => import('@/components/api'), {
//   ssr: false,
//   loading: () => <Spinner />
// });

export default function Home() {
  return (
    <div>
      <Hero home={true} />
      <Curosel />

      {/* <Suspense fallback={<Spinner />}>
        <TestApi />
      </Suspense> */}
    </div>
  );
}