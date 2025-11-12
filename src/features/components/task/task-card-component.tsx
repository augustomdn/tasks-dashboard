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
      className="p-4 flex flex-col justify-between h-64"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <span className="text-xs text-gray-500 block">
            Criado em: {formatDateTime(task.createdAt)}
          </span>
        </div>
        <div className="flex">
          <AddTaskTagDialogComponent task={task} />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditTask(task.id)}
          >
            <Edit />
          </Button>

          <DeleteTaskConfirmDialogComponent
            handleDelete={handleDeleteTask}
            taskId={task.id}
          />
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
        <p className="text-gray-700 italic text-sm leading-snug">
          {task.description || "Sem descrição"}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <TaskPriorityBadgeComponent task={task.priority} />
        <div className="flex gap-4">
          <>
            {task.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className={`${tag.color} flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white`}
              >
                <Tag className="w-3 h-3"></Tag>
                {tag.name}
              </span>
            ))}
            {/* {task.tags?.length > 2 && (
            <span className="text-xs text-gray-500 font-semibold">
              +{task.tags.length - 2}
            </span>
          )} */}
          </>
          <TaskStatusIndicatorComponent task={task.status} />
        </div>

      </div>
    </Card>
  );
}
