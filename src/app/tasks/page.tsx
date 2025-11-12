"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTasksContext } from "@/contexts/TaskContext";
import LoadingSpinnerPageComponent from "@/features/components/loading/loading";
import LogoutButtonComponent from "@/features/components/login/logout-button-component";
import AddTaskButtonComponent from "@/features/components/task/add-task-button-component";
import CreateTaskDialogComponent from "@/features/components/task/create-task-dialog-component";
import DeleteTaskConfirmDialogComponent from "@/features/components/task/delete-task-confirm-dialog-component";
import EmptySearchPlaceHolderComponent from "@/features/components/task/empty-search-results-component";
import EmptyTasksPlaceHolderComponent from "@/features/components/task/empty-tasks-placeholder-component";
import SearchTaskInputComponent from "@/features/components/task/search-task-input-component";
import TaskPriorityBadgeComponent from "@/features/components/task/task-priority-badge-component";
import { Plus, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TasksPageComponent() {
    const { tasks, deleteTask, } = useTasksContext();
    const [filterTask, setFilterTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const router = useRouter();
    const tasksContext = useTasksContext();

    const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(filterTask.toLowerCase()) ||
        task.description?.toLowerCase().includes(filterTask.toLowerCase()));


    useEffect(() => {
        const isLogged = localStorage.getItem("isLogged");
        setTimeout(() => {
            if (!isLogged) {
                router.push("/not-found");
            } else {
                setIsLoading(false);
            }
        }, 500);
    }, [router]);


    function handleLogout() {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.removeItem("isLogged");
            router.replace("/");
        }, 500);

        toast.success("Você efetuou logoff com sucesso!")

    }

    function handleEditTask(taskId: string) {
        setEditingTaskId(taskId);
        setOpen(true);
    }

    function handleDeleteTask(taskId: string) {
        deleteTask(taskId);
        localStorage.setItem("tasks", JSON.stringify(tasksContext.tasks.filter((task) => task.id !== taskId)));
        toast.success("Tarefa deletada!");

    }


    if (isLoading) {
        return <LoadingSpinnerPageComponent />;
    }


    return (
        <div className="h-screen p-4 flex flex-col gap-4 bg-linear-to-b from-green-300 to-white md:bg-linear-to-r">
            <header className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <div className="md:flex gap-2">
                    <AddTaskButtonComponent className="hidden md:flex" setEditingTaskId={setEditingTaskId} setOpen={setOpen} />
                    <LogoutButtonComponent handleLogout={handleLogout} />
                </div>
            </header>
            <div className="sm:hidden fixed right-4 bottom-4">
                <Button
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={() => { setEditingTaskId(null); setOpen(true); }}
                >
                    <Plus />
                </Button>
            </div>
            <CreateTaskDialogComponent open={open} setOpen={setOpen} task={tasksContext.tasks.find((task) => task.id === editingTaskId || null)} />
            <section className="h-full w-full flex flex-col gap-4">
                <div>
                    {tasksContext.tasks.length === 0 ? null :
                        <div className="flex items-center gap-2  rounded-md">
                            <SearchTaskInputComponent value={filterTask} setFilterTask={setFilterTask} />
                            {/* Componente de Filtragem */}
                            {/* <Dialog>
                                <DialogTrigger>
                                    <Funnel />
                                    <span>Filtrar</span>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Filtrar por</DialogTitle>
                                        <DialogDescription>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog> */}
                        </div>
                    }
                </div>
                {tasksContext.tasks.length === 0 ? (
                    <EmptyTasksPlaceHolderComponent />
                ) : filteredTasks.length === 0 ? (
                    <EmptySearchPlaceHolderComponent />
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTasks.map((task) => (
                            <Card key={task.id} className="p-4 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                    <div className="flex">
                                        <Button size="sm" variant="ghost" onClick={() => handleEditTask(task.id)}>
                                            <Edit />
                                        </Button>

                                        <DeleteTaskConfirmDialogComponent handleDelete={handleDeleteTask} taskId={task.id} />
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700 italic">{task.description || "Sem descrição"}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <TaskPriorityBadgeComponent task={task} />
                                    <span>{task.status}</span>
                                </div>
                            </Card>
                        ))}
                    </div>}
            </section >
        </div >
    );
}
