import { TaskPriorities } from "@/constants/task-priorities"
import { TaskStatus } from "@/constants/task-status"

export interface Task {
    id: string
    title: string
    description: string
    priority: TaskPriorities
    status: TaskStatus
    createdAt: string
}