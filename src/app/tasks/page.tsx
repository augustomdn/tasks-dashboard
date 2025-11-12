"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTasksContext } from "@/contexts/TaskContext";
import LoadingSpinnerPageComponent from "@/features/components/loading/loading";
import LogoutButtonComponent from "@/features/components/login/logout-button-component";
import AddTaskButtonComponent from "@/features/components/task/add-task-button-component";
import CreateTaskDialogComponent from "@/features/components/task/create-task-dialog-component";
import EmptySearchPlaceHolderComponent from "@/features/components/task/empty-search-results-component";
import EmptyTasksPlaceHolderComponent from "@/features/components/task/empty-tasks-placeholder-component";
import SearchTaskInputComponent from "@/features/components/task/search-task-input-component";
import TaskCardComponent from "@/features/components/task/task-card-component";

import { Funnel, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TASK_STATUS, TASK_STATUS_LABELS } from "@/constants/task-status";

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

    const taskStatus = TASK_STATUS;


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
                    <AddTaskButtonComponent
                        className="hidden md:flex"
                        setEditingTaskId={setEditingTaskId}
                        setOpen={setOpen} />
                    <LogoutButtonComponent handleLogout={handleLogout} />
                </div>
            </header>
            <div className="sm:hidden fixed right-4 bottom-4">
                <Button
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={() => { setEditingTaskId(null); setOpen(true); }}>
                    <Plus />
                </Button>
            </div>
            <CreateTaskDialogComponent
                open={open}
                setOpen={setOpen}
                task={tasksContext.tasks.find((task) => task.id === editingTaskId || null)} />
            <section className="h-full w-full flex flex-col gap-4">
                <div>
                    {tasksContext.tasks.length === 0 ? null :
                        <div className="flex items-center gap-2  rounded-md">
                            <SearchTaskInputComponent value={filterTask} setFilterTask={setFilterTask} />
                            {/* Componente de Filtragem */}
                            <Dialog>
                                <DialogTrigger className="flex items-center gap-4 bg-black p-2 rounded-md">
                                    <span className="text-white text-sm">Filtros</span>
                                    <Funnel size={16} color="white" />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader className="gap-4">
                                        <DialogTitle className="text-start">Filtrar por:</DialogTitle>
                                        <DialogDescription className="flex">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-semibold text-start">Status</span>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Status</SelectLabel>
                                                            {taskStatus.map((status) => {
                                                                return (

                                                                    <SelectItem key={status} value={status}>{TASK_STATUS_LABELS[status]}</SelectItem>

                                                                )
                                                            })}
                                                            {/* <SelectItem value="apple">Apple</SelectItem>
                                                            <SelectItem value="banana">Banana</SelectItem>
                                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                                            <SelectItem value="grapes">Grapes</SelectItem>
                                                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </DialogDescription>
                                        <DialogTitle className="text-start">Ordenar por:</DialogTitle>
                                        <DialogDescription className="flex">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-semibold text-start">Data</span>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Data" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Data</SelectLabel>
                                                            <SelectItem value="apple">Apple</SelectItem>
                                                            <SelectItem value="banana">Banana</SelectItem>
                                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                                            <SelectItem value="grapes">Grapes</SelectItem>
                                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    }
                </div>
                {tasksContext.tasks.length === 0 ? (
                    <EmptyTasksPlaceHolderComponent />
                ) : filteredTasks.length === 0 ? (
                    <EmptySearchPlaceHolderComponent />
                ) :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTasks.map((task) => (
                                <TaskCardComponent
                                    task={task}
                                    handleEditTask={handleEditTask}
                                    handleDeleteTask={handleDeleteTask}
                                    key={task.id}
                                />
                            ))}
                        </div>

                    </>

                }
            </section >
        </div >
    );
}
