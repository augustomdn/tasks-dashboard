export const TASK_STATUS = [
  "pending",
  "in_progress",
  "completed",
] as const;

export type TaskStatus = (typeof TASK_STATUS)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pendente",
  in_progress: "Em andamento",
  completed: "Concluído",
};
