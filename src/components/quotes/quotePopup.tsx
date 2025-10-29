import React, { useEffect, useState } from "react";
import Portal from "@/components/ui/util/portal";
import { FaTimes } from "react-icons/fa";
import { Quote } from "@/lib/definitions";
import { getRandomRenderer, QuoteRenderer } from "./quotesStyles";

type QuotePopupProps = {
    open: boolean;
    quote: Quote | null;
    onClose: () => void;
};

export default function QuotePopup({ open, quote, onClose }: QuotePopupProps) {
    const [Renderer, setRenderer] = useState<QuoteRenderer>(() => getRandomRenderer());

    useEffect(() => {
        if (open) {
            setRenderer(() => getRandomRenderer());
        }
    }, [open, quote]);

    if (!open || !quote) return null;

    return (
        <Portal open={true}>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                <div className="relative w-full max-w-md">
                    <button
                        onClick={onClose}
                        className="absolute -top-10 right-0 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
                        aria-label="Close"
                    >
                        <FaTimes className="w-4 h-4 text-white" />
                    </button>

                    <div className="relative p-10 border border-white/20 rounded-[50%_50%_45%_55%_/_55%_45%_55%_45%] animate-[morph-border_4.1s_ease-in-out_infinite] bg-white/20">
                        <div className="absolute inset-2 rounded-[50%_50%_45%_55%_/_55%_45%_55%_45%] animate-[morph-border_6.9s_ease-in-out_infinite] bg-white/30 backdrop-blur-2xl pointer-events-none" />
                        <div className="relative z-10">
                            <Renderer quote={quote} />
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
