"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TAG_COLORS } from "@/constants/task-custom-tag";
import { Check, Plus, Tag } from "lucide-react";
import { useTasksContext } from "@/contexts/TaskContext";
import { Task } from "@/types/task";
import { toast } from "sonner";

interface Props {
    task: Task,
}

export default function AddTaskTagDialogComponent({ task }: Props) {
    const { addTagToTask } = useTasksContext();
    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [tagName, setTagName] = useState("");
    const colors = TAG_COLORS;

    const handleReset = () => {
        setSelectedColor(null);
        setTagName("");
    };

    const handleAddTag = () => {
        if (!selectedColor || !tagName.trim()) return;
        addTagToTask(task.id, { name: tagName, color: selectedColor });
        handleReset();

        setOpen(false);
        toast.success(`Tag "${tagName}" adicionada com sucesso!`)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                    <Tag className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[85vw] max-w-[340px] sm:max-w-[360px] md:max-w-[300px] rounded-xl p-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-start">
                        Adicionar Tag
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 flex flex-col justify-center">
                    <Input
                        placeholder="Digite aqui"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        maxLength={20}
                    />

                    <div className="grid grid-cols-5 grid-rows-4 gap-2 place-items-center">
                        {colors.map((color, key) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={`${color} relative w-7 h-7 rounded-lg border transition-all duration-150 hover:scale-110 
                                 ${selectedColor === color
                                        ? "border-gray-500 scale-110 shadow-md"
                                        : "border-transparent"
                                    }`}
                            >
                                {selectedColor === color && (
                                    <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-sm" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={handleReset}
                    >
                        Resetar
                    </Button>
                    <Button
                        className="w-full sm:w-auto"
                        onClick={handleAddTag}
                        disabled={!selectedColor || !tagName.trim()}
                    >
                        Adicionar Tag
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
