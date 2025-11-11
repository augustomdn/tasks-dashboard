// src/contexts/TasksContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Task } from "@/types/task"

interface TasksContextType {
    tasks: Task[]
    createTask: (task: Omit<Task, "id" | "createdAt">) => void
    updateTask: (id: string, updatedTask: Partial<Task>) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) : []
    })

    const createTask = (task: Omit<Task, "id" | "createdAt">) => {
        const newTask = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...task }
        setTasks(prev => {
            const updated = [...prev, newTask]
            localStorage.setItem("tasks", JSON.stringify(updated))
            return updated
        })
    }

    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks(prev => {
            const updated = prev.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
            localStorage.setItem("tasks", JSON.stringify(updated))
            return updated
        })
    }


    return (
        <TasksContext.Provider value={{ tasks, createTask, updateTask}}>
            {children}
        </TasksContext.Provider>
    )
}

export function useTasksContext() {
    const context = useContext(TasksContext)
    if (!context) throw new Error("useTasksContext deve ser usado com  TasksProvider")
    return context
}
