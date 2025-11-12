"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useTasksContext } from "@/contexts/TaskContext";
import LoadingSpinnerPageComponent from "@/features/components/loading/loading";
import CreateTaskDialogComponent from "@/features/components/task/create-task-dialog-component";
import { AlertDialog } from "@radix-ui/react-alert-dialog";


import { LogOut, Plus, Edit, Trash, Funnel } from "lucide-react";
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

    function handleDeleteTask(id: string) {
        deleteTask(id);
        localStorage.setItem("tasks", JSON.stringify(tasksContext.tasks.filter((task) => task.id !== id)));
        toast.success("Tarefa deletada!");

    }


    if (isLoading) {
        return <LoadingSpinnerPageComponent />;
    }

    function getPriorityColor(priority: string) {
        switch (priority) {
            case "Urgente":
                return "bg-red-500 text-white";
            case "Importante":
                return "bg-yellow-500 text-black";
            case "Normal":
                return "bg-blue-500 text-white";
            case "Não importante":
                return "bg-gray-300 text-black";
            default:
                return "bg-gray-200";
        }
    }

    return (
        <div className="h-screen p-4 flex flex-col gap-4 bg-linear-to-b from-green-300 to-white md:bg-linear-to-r">
            <header className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-bold">Dashboard</h2>

                <div className="md:flex gap-2">
                    <Button className="hidden md:flex" onClick={() => { setEditingTaskId(null); setOpen(true); }}>
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


            <CreateTaskDialogComponent open={open} setOpen={setOpen} task={tasksContext.tasks.find((task) => task.id === editingTaskId || null)} />

            <section className="h-full w-full flex flex-col gap-4">
                <div>
                    {tasksContext.tasks.length === 0 ? null :
                        <div className="flex items-center gap-2  rounded-md">
                            <Input
                                type="text"
                                placeholder="Pesquisar"
                                className="bg-gray-200 outline-none py-2 w-[90vw] "
                                value={filterTask}
                                onChange={(e) => setFilterTask(e.target.value)}
                            />
                            <Dialog>
                                <DialogTrigger>
                                    <Button>
                                        <Funnel />
                                        <span>Filtrar</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Filtrar por</DialogTitle>
                                        <DialogDescription>
                                            <div className="flex flex-col gap-4">
                                                <span className="font-semibold">Prioridade</span>
                                                <Separator></Separator>
                                                <RadioGroup defaultValue="option-one">
                                                    {tasks.map((task) => (
                                                        <>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="option-one" id="option-one" />
                                                                <Label htmlFor="option-one">{task.priority}</Label>
                                                            </div>
                                                        </>
                                                    ))}
                                                </RadioGroup>
                                                <span className="font-semibold">Criado em</span>
                                                <Separator></Separator>
                                                 <RadioGroup defaultValue="option-one">
                                                    {tasks.map((task) => (
                                                        <>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="option-one" id="option-one" />
                                                                <Label htmlFor="option-one">{task.createdAt}</Label>
                                                            </div>
                                                        </>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    }
                </div>
                {
                    tasksContext.tasks.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p className="text-lg md:text-2xl text-gray-600 mb-6 text-center">
                                Você ainda não possui tarefas criadas.
                            </p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p className="text-lg md:text-2xl text-gray-600 mb-6 text-center">
                                Sem resultados para a pesquisa.
                            </p>
                        </div>
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

                                            <AlertDialog>
                                                <AlertDialogTrigger className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-lg">
                                                    <Trash className="text-red-500 m-2" size={16} />
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Tem certeza que deseja deletar esta tarefa?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta ação não pode ser desfeita, mas não se preocupe é possível criar outros cards.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Continuar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
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
                }
            </section >
        </div >
    );
}
