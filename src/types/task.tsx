import { TaskPriorities } from "@/constants/task-priorities"
import { TaskStatus } from "@/constants/task-status"
import { TaskTag } from "./task-tag"

export interface Task {
    id: string,
    title: string,
    description: string,
    priority: TaskPriorities,
    status: TaskStatus,
    createdAt: string,
    tags?: TaskTag[]
}