import { useMemo } from "react";
import { Quote } from "@/lib/definitions";

export type QuoteRenderer = React.FC<{ quote: Quote; onClose: () => void }>;

export const FancyQuoteGrid: React.FC<{ quote: Quote }> = ({ quote }) => {
    const style = useMemo(() => Math.floor(Math.random() * 6), []);

    if (style === 0) {
        return (
            <div className="group relative hover:scale-[1.03] transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/50 via-purple-400/50 to-blue-400/50 blur-3xl" style={{ borderRadius: '73% 27% 56% 44% / 38% 59% 41% 62%' }} />
                <div className="relative bg-gradient-to-br from-pink-400/20 to-purple-500/20 backdrop-blur-2xl border border-white/30 p-8 shadow-[0_0_25px_rgba(255,105,180,0.4)] overflow-hidden" style={{ borderRadius: '73% 27% 56% 44% / 38% 59% 41% 62%' }}>
                    <div className="absolute top-4 left-4 text-6xl opacity-20 text-white">"</div>
                    <p className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/30 px-3 py-1 rounded-full inline-block">— {quote.author}</p>
                </div>
            </div>
        );
    }

    if (style === 1) {
        return (
            <div className="group relative hover:scale-[1.03] transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 via-cyan-400/50 to-emerald-400/50 blur-3xl" style={{ borderRadius: '3rem 1rem 3rem 1rem' }} />
                <div className="relative bg-gradient-to-r from-blue-400/25 to-cyan-400/25 backdrop-blur-xl border border-white/30 p-8 shadow-[0_0_25px_rgba(0,191,255,0.4)]" style={{ borderRadius: '3rem 1rem 3rem 1rem' }}>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                    <p className="text-xl font-semibold text-gray-800 mb-3 leading-relaxed">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/40 px-3 py-1 rounded-full">— {quote.author}</p>
                </div>
            </div>
        );
    }

    if (style === 2) {
        return (
            <div className="group relative hover:rotate-2 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300/50 via-yellow-400/50 to-orange-400/50 blur-3xl" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                <div className="relative bg-gradient-to-br from-amber-300/25 to-yellow-400/25 backdrop-blur-2xl border border-white/30 p-8 shadow-[0_0_25px_rgba(255,165,0,0.4)] overflow-hidden" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <p className="text-lg font-semibold text-gray-800 mb-3 leading-relaxed relative z-10">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/40 px-3 py-1 rounded-full">— {quote.author}</p>
                </div>
            </div>
        );
    }

    if (style === 3) {
        return (
            <div className="group relative hover:rotate-1 transition-all duration-500 cursor-pointer">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/50 via-emerald-400/50 to-green-400/50 blur-3xl" style={{ borderRadius: '45% 55% 70% 30% / 55% 65% 35% 45%' }} />
                <div className="relative bg-gradient-to-r from-teal-400/25 to-emerald-400/25 backdrop-blur-xl border border-white/30 p-8 shadow-[0_0_25px_rgba(0,128,128,0.4)]" style={{ borderRadius: '82% 18% 75% 25% / 43% 71% 29% 57%' }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <p className="text-lg font-semibold text-gray-800 mb-3 leading-relaxed">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/40 px-3 py-1 rounded-full">— {quote.author}</p>
                </div>
            </div>
        );
    }

    if (style === 4) {
        return (
            <div className="group relative hover:rotate-1 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/50 via-fuchsia-500/50 to-purple-500/50 blur-3xl" />
                <div className="relative bg-gradient-to-br from-rose-400/25 to-fuchsia-500/25 backdrop-blur-xl border border-white/30 p-8 shadow-[0_0_25px_rgba(219,39,119,0.4)]" style={{ borderRadius: '85% 15% 65% 35% / 25% 70% 30% 75%' }}>
                    <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]"></div>
                    <p className="text-base font-semibold text-gray-800 mb-2 leading-relaxed relative z-10">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/40 px-3 py-1 rounded-full">— {quote.author}</p>
                </div>
            </div>
        );
    }

    if (style === 5) {
        return (
            <div className="group relative hover:scale-102 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/50 via-purple-400/50 to-pink-400/50 blur-3xl" />
                <div className="relative bg-gradient-to-br from-indigo-400/25 via-purple-400/25 to-pink-400/25 backdrop-blur-2xl border border-white/30 p-8 shadow-[0_0_25px_rgba(147,51,234,0.4)] overflow-hidden" style={{ borderRadius: '2rem' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-y-12 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
                    <div className="absolute top-2 right-2 text-4xl opacity-30 text-white">❝</div>
                    <div className="absolute bottom-2 left-2 text-4xl opacity-30 text-white">❞</div>
                    <p className="text-lg font-semibold text-gray-800 mb-3 leading-relaxed relative z-10">"{quote.quote}"</p>
                    <p className="text-sm font-medium text-gray-700 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">— {quote.author}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/40 via-purple-400/40 to-pink-400/40 blur-3xl" />
            <div className="relative flex flex-col gap-1">
                <div className="bg-gradient-to-br from-pink-400/25 to-purple-500/25 backdrop-blur-2xl border border-white/30 p-15 transform -rotate-2 hover:rotate-0 transition-all duration-300" style={{ borderRadius: '85% 15% 65% 35% / 25% 70% 30% 75%' }}>
                    <p className="text-base font-bold text-gray-900 mb-2 leading-relaxed relative z-10">"{quote.quote}"</p>
                </div>
                <div className="bg-gradient-to-br from-purple-400/25 to-pink-400/25 backdrop-blur-lg border border-white/20 p-6 transform rotate-1 hover:rotate-2 transition-all duration-300 flex items-center gap-3" style={{ borderRadius: '25% 75% 55% 45% / 65% 35% 65% 35%' }}>
                    <p className="text-sm font-semibold text-gray-800 relative z-10">— {quote.author}</p>
                </div>
            </div>
        </div>
    );
}
export function getRandomRenderer(): QuoteRenderer {
    return ({ quote }) => <FancyQuoteGrid quote={quote} />;
}