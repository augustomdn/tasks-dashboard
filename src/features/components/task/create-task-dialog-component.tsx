"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CirclePlus, Undo } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Task } from "@/types/task"
import { useTasksContext } from "@/contexts/TaskContext"

interface Priority {
  value: string
  label: string
}

const priorityOptions: Priority[] = [
  { value: "not-urgent", label: "Não urgente" },
  { value: "normal", label: "Normal" },
  { value: "urgent", label: "Urgente" },
  { value: "important", label: "Importante" },
]

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  task?: Task;
}

export default function CreateTaskDialogComponent({ open, setOpen }: Props) {
  const { createTask } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    createTask({
      title,
      description,
      priority,
      status: "pending",
    })


    setTitle("")
    setDescription("")
    setPriority("normal")
    setOpen(false)
  }

  function handleReset() {
    setTitle("")
    setDescription("")
    setPriority("normal")
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <FieldDescription>Dê mais autonomia ao seu dia!</FieldDescription>
        </DialogHeader>

        <form onSubmit={handleAddTask}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Título</FieldLabel>
              <Input
                id="title"
                placeholder="Ex: Apresentar a aplicação ao time da SGA"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                id="description"
                placeholder="Adicione uma descrição à sua tarefa (Opcional)"
                className="resize-none"
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Prioridade</FieldLegend>
              <FieldGroup>
                <Field orientation="horizontal" className="flex-wrap gap-3">
                  {priorityOptions.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`priority-${option.value}`}
                        checked={priority === option.value}
                        onCheckedChange={() => setPriority(option.value)}
                      />
                      <FieldLabel
                        htmlFor={`priority-${option.value}`}
                        className="font-normal"
                      >
                        {option.label}
                      </FieldLabel>
                    </div>
                  ))}
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>

          <DialogFooter className="pt-4 flex justify-between">
            <Button variant="outline" type="button" onClick={handleReset}>
              <Undo className="mr-2" />
              Limpar
            </Button>
            <Button type="submit">
              <CirclePlus className="mr-2" />
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
