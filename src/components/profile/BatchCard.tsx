import { LuGraduationCap } from "react-icons/lu";

interface Batch {
    batch_id: number;
    course_id: number;
    batch_name: string;
    status: string;
}

interface BatchCardProps {
    batches?: Batch[];
}

const BatchCard = ({ batches }: BatchCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-success/20 text-success border-success/30";
            case "completed":
                return "bg-info/20 text-info border-info/30";
            case "pending":
                return "bg-warning/20 text-warning border-warning/30";
            default:
                return "bg-primary-dark/20 text-gray border-primary-dark/30";
        }
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative backdrop-blur-sm bg-slate-800/30 border border-primary-dark/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <LuGraduationCap className="w-5 h-5 text-primary-fade" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Batch Enrollments</h3>
                </div>

                {!batches || batches.length === 0 ? (
                    <p className="text-gray italic text-center py-4">
                        No batch enrollments yet
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {batches.map((batch) => (
                            <div
                                key={batch.batch_id}
                                className="backdrop-blur-sm bg-background/20 border border-primary-dark/30 rounded-lg p-4 hover:border-primary/40 transition-all duration-200"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <h4 className="font-semibold text-foreground mb-2">
                                        {batch.batch_name}
                                    </h4>

                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                            batch.status
                                        )} capitalize`}
                                    >
                                        {batch.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BatchCard;
