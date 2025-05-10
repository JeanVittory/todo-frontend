export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
};

export type CreateTodo = {
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
};
