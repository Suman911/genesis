import Link from "next/link";

export default function About_detail() {
    return (
        <div>
            <h1>about details page</h1>
            <Link href="/">
                index
            </Link>
            <Link href="/about">
                about
            </Link>
        </div>
    );
}
