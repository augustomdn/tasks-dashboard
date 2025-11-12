"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasksContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  TASK_PRIORITIES,
  TASK_PRIORITIES_LABELS,
  TaskPriorities,
} from "@/constants/task-priorities";

import {
  TASK_STATUS,
  TASK_STATUS_LABELS,
  TaskStatus,
} from "@/constants/task-status";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  task?: Task | null;
}

interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriorities;
  status: TaskStatus;
}

export default function CreateTaskDialogComponent({ open, setOpen, task }: Props) {
  const { createTask, updateTask } = useTasksContext();

  const taskPriorities = TASK_PRIORITIES;
  const taskPrioritiesLabels = TASK_PRIORITIES_LABELS;
  const taskStatus = TASK_STATUS;
  const taskStatusLabels = TASK_STATUS_LABELS;

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      priority: "normal",
      status: "pending",
    }
  });


  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      })
    } else {
      reset({
        title: "",
        description: "",
        priority: "normal",
        status: "pending"
      })
    }
  }, [task, open, reset]);

  function onSubmit(data: TaskFormValues) {
    if (task) {
      updateTask(task.id, data);
      toast.success("Tarefa atualizada!");
    } else {
      createTask(data);
      toast.success("Tarefa criada!");
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90vw] max-w-md max-h-[80vh] overflow-y-auto sm:max-w-lg rounded-xl p-4">

        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center sm:text-left">
            {task ? "Editar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
          <div>
            <Label className="text-sm">Título</Label>
            <Input
              placeholder="Título"
              {...register("title", { required: "O título é obrigatório!" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}

          </div>

          <Label className="text-sm">Descrição</Label>
          <Textarea
            placeholder="Descrição"
            className="h-24 resize-none w-full wrap-break-word overflow-y-auto"
            aria-expanded="false"
            {...register("description")}
          />


          <Label className="text-sm">Prioridade</Label>
          <select
            className="border rounded p-2"
            {...register("priority")}
          >
            {taskPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {taskPrioritiesLabels[priority]}
              </option>
            ))}
          </select>

          <Label className="text-sm">Status</Label>
          <select
            className="border rounded p-2"
            {...register("status")}
          >
            {taskStatus.map((status) => (
              <option key={status} value={status}>
                {taskStatusLabels[status]}
              </option>
            ))}
          </select>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              {task ? "Salvar Alterações" : "Criar Tarefa"}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
