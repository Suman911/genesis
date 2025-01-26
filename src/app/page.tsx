import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>index page</h1>
      <Link href="/about">
        about
      </Link>
    </div>
  );
}