import { Task } from "@/types/task";
import { Tag } from "lucide-react";

interface Props {
    task: Task;
}


export default function TaskTagComponent({ task }: Props) {
    return (
        <>
            {task.tags?.slice(0, 2).map((tag, index) => {
                const displayName =
                    tag.name.length > 8 ? `${tag.name.slice(0, 8)}...` : tag.name;

                return (
                    <span
                        key={index}
                        className={`${tag.color} flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white`}
                    >
                        <Tag className="w-3 h-3" />
                        {displayName}
                    </span>
                );
            })}
            {task.tags && task.tags.length > 2 && (
                <span className="text-xs text-gray-500 font-semibold">
                    +{task.tags.length - 2}
                </span>
            )}
        </>
    )
}