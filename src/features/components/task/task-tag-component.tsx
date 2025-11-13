import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Task } from "@/types/task";
import { Tag } from "lucide-react";

interface Props {
    task: Task;
}

export default function TaskTagComponent({ task }: Props) {
    const visibleTags = task.tags?.slice(0, 2) || [];
    const extraTags = task.tags?.slice(2) || [];

    return (
        <>
            {visibleTags.map((tag, index) => {
                const displayName =
                    tag.name.length > 5 ? `${tag.name.slice(0, 5)}...` : tag.name;

                return (
                    <Tooltip key={index}>
                        <TooltipTrigger>
                            <span className={`${tag.color} flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white`}>
                                <Tag className="w-3 h-3" />
                                {displayName}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {tag.name}
                        </TooltipContent>
                    </Tooltip>
                );
            })}

            {extraTags.length > 0 && (
                <Tooltip>
                    <TooltipTrigger>
                        <span className="text-xs text-gray-500 font-semibold">
                            +{extraTags.length}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="flex flex-col gap-1">
                            {extraTags.map((tag, index) => (
                                <span key={index} className={`${tag.color} flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white`}>
                                    <Tag className="w-3 h-3" />
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </TooltipContent>
                </Tooltip>
            )}
        </>
    );
}
