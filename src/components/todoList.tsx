import { ListChecks, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Todo } from "../types/todos";
import { getPriorityColor } from "../utils";

type TodoListProps = {
  todos: Todo[];
  handleRemoveTodo: (todoId: number) => void;
};

export default function TodoList({ todos, handleRemoveTodo }: TodoListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          My Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!todos || todos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            There is not pending tasks
          </p>
        ) : (
          <ul className="space-y-4">
            {todos &&
              todos.map((todo) => (
                <li key={todo.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-medium ${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.title}
                        </h3>
                        <div className="h-max flex gap-3 flex-col items-center">
                          <Badge className={getPriorityColor(todo.priority)}>
                            {todo.priority}
                          </Badge>
                          <Trash2
                            size="20px"
                            onClick={() => handleRemoveTodo(todo.id)}
                            className="lg:cursor-pointer"
                          />
                        </div>
                      </div>
                      {todo.description && (
                        <p
                          className={`mt-1 text-sm ${
                            todo.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
