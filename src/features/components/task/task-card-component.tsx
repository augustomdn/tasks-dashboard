import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import DeleteTaskConfirmDialogComponent from "./delete-task-confirm-dialog-component";
import TaskPriorityBadgeComponent from "./task-priority-badge-component";
import { Task } from "@/types/task";
import { TASK_STATUS_LABELS } from "@/constants/task-status";

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

  const taskLabel = TASK_STATUS_LABELS;


  return (
    <Card
      key={task.id}
      className="p-4 flex flex-col justify-between h-64"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <span className="text-xs text-gray-500 block">
            Criado em: {task.createdAt}
          </span>
        </div>
        <div className="flex">
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
        <span className="text-sm text-gray-600">{taskLabel[task.status]}</span>
      </div>
    </Card>
  );
}
