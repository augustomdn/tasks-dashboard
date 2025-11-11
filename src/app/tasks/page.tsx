"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTasksContext } from "@/contexts/TaskContext";
import LoadingSpinnerPageComponent from "@/features/components/loading/loading";
import CreateTaskDialogComponent from "@/features/components/task/create-task-dialog-component";
import { LogOut, Plus, Edit, Funnel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksPageComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const router = useRouter();
    const tasks = useTasksContext();

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
    }

    function handleEditTask(taskId: string) {
        setEditingTaskId(taskId);
        setOpen(true);
    }

    if (isLoading) {
        return <LoadingSpinnerPageComponent />;
    }

    // Função auxiliar para colorir a prioridade
    function getPriorityColor(priority: string) {
        switch (priority) {
            case "urgent":
                return "bg-red-500 text-white";
            case "important":
                return "bg-yellow-500 text-black";
            case "normal":
                return "bg-blue-500 text-white";
            case "not-urgent":
                return "bg-gray-300 text-black";
            default:
                return "bg-gray-200";
        }
    }

    return (
        <div className="h-screen p-4 flex flex-col gap-4 bg-linear-to-b from-green-300 to-white md:bg-linear-to-r">
            <header className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-bold">Dashboard</h2>

                <div className="hidden md:flex gap-2">
                    <Button onClick={() => { setEditingTaskId(null); setOpen(true); }}>
                        <Plus className="mr-2" />
                        Nova Tarefa
                    </Button>
                    <Button onClick={handleLogout} variant="outline">
                        <LogOut />
                        <span>Logout</span>
                    </Button>
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


            <CreateTaskDialogComponent open={open} setOpen={setOpen} />

            <section className="w-full flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-bold text-center">Minha Lista</h2>
                    <Button>
                        <Funnel />
                        <span>Filtrar</span>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.tasks.map((task) => (
                        <Card key={task.id} className="p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <Button size="sm" variant="ghost" onClick={() => handleEditTask(task.id)}>
                                    <Edit />
                                </Button>
                            </div>
                            <p className="mt-2 text-gray-700">{task.description || "Sem descrição"}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <span className="text-sm italic">{task.status}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
