'use client';
import { useEffect, useState } from 'react';
import { Quote } from '@/lib/definitions';
import Axios from '@/utils/Axios';
import QuotePopup from '@/components/quotes/quotePopup';
import { usePathname } from 'next/navigation';

export const Spinner = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="relative">
            {[0, 1, 2].map((quantum) => {
                const size = 200 - quantum * 50;
                const color = `hsl(${228 + quantum * 60}, 47%, ${40 + quantum * 15}%)`;
                return (
                    <div
                        key={quantum}
                        className="absolute animate-spin border-t-4 border-l-4 border-solid rounded-full"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            top: `calc(50% - ${size / 2}px)`,
                            left: `calc(50% - ${size / 2}px)`,
                            borderColor: color,
                            opacity: 0.6 + quantum * 0.2,
                            animationDuration: `${1.5 + quantum * 0.7}s`,
                        }}
                    >
                        <div className="absolute left-1/3 -top-5 w-3 h-3 bg-primary rounded-full" />
                    </div>
                );
            })}
            {children}
        </div>
    );
}

export default function Preloader() {
    const [fadeOut, setFadeOut] = useState(false);
    const [hide, setHide] = useState(false);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const isAuth = usePathname().startsWith('/auth');

    useEffect(() => {
        const load = async () => {
            if (!isAuth) {
                try {
                    const res: { quote: Quote } = await Axios.get('/quotes', { params: { new: true } });
                    setQuote(res.quote);
                } catch (error) {
                    console.error('Failed to fetch quote:', error);
                }
            }
            setTimeout(() => setFadeOut(true), 500);
        };
        load();
    }, [isAuth]);

    useEffect(() => {
        if (fadeOut) {
            const t = setTimeout(() => {
                setHide(true);
                if (!isAuth) setShowPopup(true);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [fadeOut, isAuth]);

    return (
        <>
            {!isAuth && <QuotePopup open={showPopup} quote={quote} onClose={() => setShowPopup(false)} />}
            {!hide && (
                <div
                    className={`fixed bg-primary-fade/70 z-100 flex justify-center items-center h-screen w-screen transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                        }`}
                >
                    <Spinner>
                        <img src="/assets/images/logo_main.png" alt="Logo" className="w-16 h-16" />
                    </Spinner>
                </div>
            )}
        </>
    );
}