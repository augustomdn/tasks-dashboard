import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
    setOpen: (value: boolean) => void;
    setEditingTaskId: (id: string | null) => void;
    className?: string;
}

export default function AddTaskButtonComponent({ setEditingTaskId, setOpen, className }: Props) {
    return (
        <Button
            className={className}
            onClick={() => { setEditingTaskId(null); setOpen(true)}}
        >
            <Plus className="mr-2" />
            Nova Tarefa
        </Button>
    );
}
