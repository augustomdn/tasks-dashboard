"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasksContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  task?: Task | null;
}

export default function CreateTaskDialogComponent({ open, setOpen, task }: Props) {
  const { createTask, updateTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");

  // Preenche os campos caso esteja editando
  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("normal");
    }
  }, [task, open]);

  function handleSave() {
    if (task) {
      updateTask(task.id, { title, description, priority });
    } else {
      createTask({ title, description, priority, status: "pending" });
    }
    setOpen(false);
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="border rounded p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="urgent">Urgente</option>
            <option value="important">Importante</option>
            <option value="normal">Normal</option>
            <option value="not-urgent">Não Urgente</option>
          </select>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            {task ? "Salvar Alterações" : "Criar Tarefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
