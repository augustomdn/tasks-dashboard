import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";


interface Props {
    task: Task;
}

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
        <Badge className={`${getPriorityColor(task.priority)}`}><span className="text-sm italic">{task.priority}</span></Badge>

    )
}