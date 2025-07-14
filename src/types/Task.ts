export interface TaskInterface {
  index: number;
  title: string;
  content: string;
  status: Status;
  dueDate?: Date;
}

export type Status = "pending" | "completed" | "expired" | "deleted";
export type TodoType = "all" | "deleted";
