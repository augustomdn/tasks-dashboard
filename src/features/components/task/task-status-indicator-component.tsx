import { TASK_STATUS_LABELS, TaskStatus } from "@/constants/task-status";

interface Props {
    task: TaskStatus;
}

const taskLabel = TASK_STATUS_LABELS;

function getStatusColor(priority: string) {
    switch (priority) {
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
    return (
        <div className="flex items-center gap-2">
            <span className={`${getStatusColor(taskLabel[task])} animate-pulse w-2 h-2 rounded-[50%]`}></span>
            <span className="text-sm text-gray-600 text-ellipsis">{taskLabel[task]}</span>
        </div>
    )

}