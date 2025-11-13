import { TASK_STATUS_LABELS, TaskStatus } from "@/constants/task-status";

interface Props {
    task: TaskStatus;
}

const taskLabel = TASK_STATUS_LABELS;

function getStatusColor(status: string) {
    switch (status) {
        case "Pendente":
            return "bg-amber-500";
        case "Em andamento":
            return "bg-blue-500";
        case "Concluído":
            return "bg-lime-500";
        default:
            return "none";
    }
}

export default function TaskStatusIndicatorComponent({ task }: Props) {
    const label = taskLabel[task];

    const displayLabel = label.length > 5 ? `${label.slice(0, 10)}...` : label;

    return (
        <div className="flex items-center gap-2">
            <span className={`${getStatusColor(label)} animate-pulse w-2 h-2 rounded-full`}></span>
            <span className="text-sm text-gray-600">
                <span className="md:hidden">{displayLabel}</span>
                <span className="hidden md:inline">{label}</span>
            </span>
        </div>
    );
}
