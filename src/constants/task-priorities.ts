export const TASK_PRIORITIES = [
  "urgent",
  "important",
  "normal",
  "not_important",
] as const;

export type TaskPriorities = (typeof TASK_PRIORITIES)[number];

export const TASK_PRIORITIES_LABELS: Record<TaskPriorities, string> = {
  urgent: "Urgente",
  important: "Importante",
  normal: "Normal",
  not_important: "Não Importante",

};
