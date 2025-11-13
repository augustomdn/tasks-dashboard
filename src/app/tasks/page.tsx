"use client"

import { Button } from "@/components/ui/button";
import { useTasksContext } from "@/contexts/TaskContext";
import LoadingSpinnerPageComponent from "@/features/components/loading/loading";
import LogoutButtonComponent from "@/features/components/login/logout-button-component";
import AddTaskButtonComponent from "@/features/components/task/add-task-button-component";
import CreateTaskDialogComponent from "@/features/components/task/create-task-dialog-component";
import EmptySearchPlaceHolderComponent from "@/features/components/task/empty-search-results-component";
import EmptyTasksPlaceHolderComponent from "@/features/components/task/empty-tasks-placeholder-component";
import SearchTaskInputComponent from "@/features/components/task/search-task-input-component";
import TaskCardComponent from "@/features/components/task/task-card-component";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TASK_STATUS_LABELS } from "@/constants/task-status";
import TaskFilterDialogComponent from "@/features/components/task/task-filter-dialog-component";

export default function TasksPageComponent() {
    const { tasks, deleteTask, } = useTasksContext();
    const [filterTask, setFilterTask] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const router = useRouter();
    const tasksContext = useTasksContext();

    const statusLabel = TASK_STATUS_LABELS;

    const filteredTasks = tasks.filter((task) => {

        const matchesText = task.title.toLowerCase().includes(filterTask.toLowerCase()) ||
            task.description?.toLowerCase().includes(filterTask.toLowerCase()) || statusLabel[task.status].toLowerCase().includes(filterTask.toLowerCase());

        const matchesStatus = selectedStatus ? task.status === selectedStatus : true;
        const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
        const matchesTag = selectedTag ? task.tags?.some((tag) => tag.name === selectedTag) : true;

        return matchesText && matchesStatus && matchesPriority && matchesTag;
    }).sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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
        <div className="h-full md:h-screen p-4 flex flex-col gap-4 bg-linear-to-b from-green-300 to-white md:bg-linear-to-r ">
            <header className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <div className="flex gap 2 md:flex gap-2">
                    <AddTaskButtonComponent
                        className="max-sm:hidden md:flex"
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
                            <TaskFilterDialogComponent
                                open={openFilter}
                                setOpen={setOpenFilter}
                                tasks={tasksContext.tasks}
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                                selectedPriority={selectedPriority}
                                setSelectedPriority={setSelectedPriority}
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                                selectedTag={selectedTag}
                                setSelectedTag={setSelectedTag}
                            />
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
