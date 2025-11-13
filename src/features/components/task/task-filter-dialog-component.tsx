"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eraser, Funnel, Tag } from "lucide-react"
import { TASK_STATUS, TASK_STATUS_LABELS } from "@/constants/task-status"
import { TASK_PRIORITIES, TASK_PRIORITIES_LABELS } from "@/constants/task-priorities"
import { Button } from "@/components/ui/button"
import { Task } from "@/types/task"

interface TaskFilterDialogComponentProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    selectedStatus: string | null;
    setSelectedStatus: (status: string | null) => void;
    selectedPriority: string | null;
    setSelectedPriority: (status: string | null) => void;
    sortOrder: "asc" | "desc" | null
    setSortOrder: (order: "asc" | "desc" | null) => void
    selectedTag: string | null;
    setSelectedTag: (tag: string | null) => void;
    tasks: Task[];
}

export default function TaskFilterDialogComponent({
    open,
    setOpen,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    tasks
}: TaskFilterDialogComponentProps) {

    const taskStatus = TASK_STATUS;
    const taskLabels = TASK_STATUS_LABELS;
    const taskPriority = TASK_PRIORITIES;
    const priorityLabel = TASK_PRIORITIES_LABELS;

    const allTags = tasks.flatMap(task => task.tags ?? []);

    const uniqueTags = Array.from(
        new Map(allTags.map(tag => [tag.name, tag])).values()
    );

    function handleReset() {
        setSelectedStatus(null);
        setSelectedPriority(null);
        setSortOrder(null);
        setSelectedTag(null)
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-2 bg-black p-2 rounded-md">
                <span className="text-white text-sm">Filtros</span>
                <Funnel size={16} color="white" />
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle className="text-start">Filtrar por:</DialogTitle>

                    <DialogDescription className="flex flex-col gap-2">
                        <span className="font-semibold text-start">Status</span>
                        <Select
                            value={selectedStatus ?? "_"}
                            onValueChange={(status) => setSelectedStatus(status === "_" ? null : status || null)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="_">Todos</SelectItem>
                                    {taskStatus.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {taskLabels[status]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span className="font-semibold text-start">Prioridade</span>
                        <Select value={selectedPriority ?? "_"} onValueChange={(status) => setSelectedPriority(status === "_" ? null : status || null)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="_">Todos</SelectItem>
                                    {taskPriority.map((priority) => (
                                        <SelectItem key={priority} value={priority} >
                                            {priorityLabel[priority]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span className="font-semibold text-start">Data</span>
                        <Select
                            value={sortOrder ?? "_"}
                            onValueChange={(order) => setSortOrder(order === "_" ? null : (order as "asc" | "desc"))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Ordem" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Ordenar por</SelectLabel>
                                    <SelectItem value="_">Padrão</SelectItem>
                                    <SelectItem value="asc">Mais antigas</SelectItem>
                                    <SelectItem value="desc">Mais recentes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span className="font-semibold text-start">Tags</span>
                        <div className="flex justify-center flex-wrap gap-2">
                            {uniqueTags.length === 0 ? (
                                <p className="col-span-5 text-sm text-gray-500">Nenhuma tag usada</p>
                            ) : (
                                uniqueTags.map((tag, key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setSelectedTag(tag.name)}
                                        className={`${tag.color} flex items-center justify-center gap-2 px-2 py-1 rounded-md border transition-all duration-150 hover:scale-105
                                ${selectedTag === tag.name
                                                ? "border-gray-500 scale-105 shadow-md"
                                                : "border-transparent"
                                            }`}
                                    >
                                        <Tag className="w-3 h-3 text-white" />
                                        <span className="text-xs font-medium text-white">{tag.name}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full flex justify-center sm:justify-end">
                    <Button onClick={handleReset} className="flex items-center gap-2">
                        <Eraser className="w-4 h-4" />
                        <span>Limpar Filtros</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
