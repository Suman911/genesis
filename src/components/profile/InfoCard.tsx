import { IconType } from "react-icons";

interface InfoCardProps {
    title: string;
    icon: IconType;
    children: React.ReactNode;
    className?: string;
}

const InfoCard = ({ title, icon: Icon, children, className = "" }: InfoCardProps) => {
    return (
        <div className={`group relative ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative backdrop-blur-sm bg-slate-800/30 border border-primary-dark/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/20 flex items-center justify-center w-10 h-10">
                        <Icon className="w-5 h-5 text-primary-fade" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                </div>
                <div className="space-y-3 text-sm">{children}</div>
            </div>
        </div>
    );
};

interface InfoItemProps {
    label: string;
    value?: string | null;
    fallback?: string;
}

export const InfoItem = ({ label, value, fallback = "Not provided" }: InfoItemProps) => {
    return (
        <div className="flex justify-between items-start">
            <span className="text-gray">{label}:</span>
            <span className="text-foreground font-medium text-right">
                {value || <span className="text-gray italic">{fallback}</span>}
            </span>
        </div>
    );
};

export default InfoCard;
