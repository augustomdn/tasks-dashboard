"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasksContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  task?: Task | null;
}

export default function CreateTaskDialogComponent({ open, setOpen, task }: Props) {
  const { createTask, updateTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Normal");
      setStatus("Pendente");
    }
  }, [task, open]);

  function handleSave() {
    if (task) {
      updateTask(task.id, { title, description, priority, status });
      toast.success("Tarefa atualizada!");
    } else {
      createTask({ title, description, priority, status });
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

        <div className="flex flex-col gap-3 mt-4">
          <Label className="text-sm">Título</Label>
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label className="text-sm">Descrição</Label>
          <Textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24 resize-none w-full wrap-break-word overflow-y-auto"
            aria-expanded="false"
          />


          <Label className="text-sm">Prioridade</Label>
          <select
            className="border rounded p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Importante">Importante</option>
            <option value="Normal">Normal</option>
            <option value="Não importante">Não importante</option>
          </select>

          <Label className="text-sm">Status</Label>
          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            {task ? "Salvar Alterações" : "Criar Tarefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
