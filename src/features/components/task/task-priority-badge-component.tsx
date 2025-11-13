import { Badge } from "@/components/ui/badge";
import { TASK_PRIORITIES_LABELS, TaskPriorities } from "@/constants/task-priorities";

interface Props {
    task: TaskPriorities;
}

const taskPriority = TASK_PRIORITIES_LABELS;

function getPriorityColor(priority: string) {
    switch (priority) {
        case "Urgente":
            return "bg-red-500";
        case "Importante":
            return "bg-orange-500";
        case "Normal":
            return "bg-blue-500";
        case "Não importante":
            return "bg-gray-500";
        default:
            return "default";
    }
}

export default function TaskPriorityBadgeComponent({ task }: Props) {
    return (
        <Badge className={`${getPriorityColor(taskPriority[task])}`}><span className="text-[0.8rem]">{taskPriority[task]}</span></Badge>

    )
}