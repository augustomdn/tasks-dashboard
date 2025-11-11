// src/contexts/TasksContext.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Task } from "@/types/task"

interface TasksContextType {
  tasks: Task[]
  createTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updatedTask: Partial<Task>) => void
  deleteTask: (id: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("tasks")
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTasks(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const createTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...task }
    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const context = useContext(TasksContext)
  if (!context) throw new Error("useTasksContext deve ser usado dentro de um TasksProvider")
  return context
}
