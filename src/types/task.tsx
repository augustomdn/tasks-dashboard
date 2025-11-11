export type TaskStatus = "pending" | "in_progress" | "done"
export type TaskPriority = "not-urgent" | "normal" | "urgent" | "important"


export interface Task {
    id: string
    title: string
    description: string
    priority: string
    status: string
    createdAt: string
}