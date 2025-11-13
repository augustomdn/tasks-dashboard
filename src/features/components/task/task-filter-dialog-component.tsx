"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eraser, Funnel } from "lucide-react"
import { TASK_STATUS, TASK_STATUS_LABELS } from "@/constants/task-status"
import { TASK_PRIORITIES, TASK_PRIORITIES_LABELS } from "@/constants/task-priorities"
import { Button } from "@/components/ui/button"

interface TaskFilterDialogComponentProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    selectedStatus: string | null;
    setSelectedStatus: (status: string | null) => void;
    selectedPriority: string | null;
    setSelectedPriority: (status: string | null) => void;
    sortOrder: "asc" | "desc" | null
    setSortOrder: (order: "asc" | "desc" | null) => void
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
}: TaskFilterDialogComponentProps) {

    const taskStatus = TASK_STATUS;
    const taskLabels = TASK_STATUS_LABELS;
    const taskPriority = TASK_PRIORITIES;
    const priorityLabel = TASK_PRIORITIES_LABELS;

    function handleReset() {
        setSelectedStatus(null);
        setSelectedPriority(null);
        setSortOrder(null);
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
