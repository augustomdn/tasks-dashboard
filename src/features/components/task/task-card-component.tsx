import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Tag } from "lucide-react";
import DeleteTaskConfirmDialogComponent from "./delete-task-confirm-dialog-component";
import TaskPriorityBadgeComponent from "./task-priority-badge-component";
import { Task } from "@/types/task";
import TaskStatusIndicatorComponent from "./task-status-indicator-component";
import { formatDateTime } from "@/utils/formatDate";
import AddTaskTagDialogComponent from "./add-task-tag-dialog-component";

interface CardProps {
  task: Task;
  handleEditTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

export default function TaskCardComponent({
  task,
  handleEditTask,
  handleDeleteTask,
}: CardProps) {
  return (
    <Card
      key={task.id}
      className="p-4 flex flex-col justify-between min-h-56 sm:min-h-64 transition-all duration-150">
      <div className="flex flex-col justify-between items-start gap-2">
        <div className="w-full flex justify-between">
          <h3 className="text-lg font-semibold truncate">{task.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <AddTaskTagDialogComponent task={task} />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEditTask(task.id)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <DeleteTaskConfirmDialogComponent
              handleDelete={handleDeleteTask}
              taskId={task.id}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-gray-500 block">
              Criado em: {formatDateTime(task.createdAt)}
            </span>
            <TaskPriorityBadgeComponent task={task.priority} />
          </div>
        </div>

      </div>

      <div className="mt-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
        <p className="text-gray-700 italic text-sm leading-snug wrap-break-word">
          {task.description || "Sem descrição"}
        </p>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex gap-2 items-center">
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
          </div>

          <TaskStatusIndicatorComponent task={task.status} />
        </div>
      </div>
    </Card>
  );
}
