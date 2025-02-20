import Lottie from "lottie-react";
import ImportantIconAnimation from "@/components/ui/icon/importantIcon.json"; // Adjust path accordingly

export function ImportantIcon({ className }: { className?: string }) {
    return (
            <Lottie className={className} animationData={ImportantIconAnimation} loop={true} />
    );
}
