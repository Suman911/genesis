import Link from "next/link";

export default function About() {
    return (
        <div>
            <h1>about page</h1>
            <Link href="/">
                index
            </Link>
            <Link href="/about/about_detail">
                about_detail
            </Link>
        </div>
    );
}
