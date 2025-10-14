import '@/styles/index';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    subsets: ['latin'],
    weight: "400",
});


export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                {children}
            </body>
        </html>
    )
}
