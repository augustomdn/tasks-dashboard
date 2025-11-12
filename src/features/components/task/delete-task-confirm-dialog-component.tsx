import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface DeleteTaskConfirmDialogComponentProps {
  handleDelete: (id: string) => void;
  taskId: string;
}

export default function DeleteTaskConfirmDialogComponent({
  handleDelete,
  taskId,
}: DeleteTaskConfirmDialogComponentProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-lg">
          <Trash className="text-red-500 m-2" size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja deletar esta tarefa?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(taskId)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
