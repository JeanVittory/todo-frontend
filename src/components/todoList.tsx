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
          <span data-testid="todo-list-title">My Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!todos || todos.length === 0 ? (
          <p
            data-testid="empty-todo-message"
            className="text-center text-gray-500 py-4"
          >
            There is not pending tasks
          </p>
        ) : (
          <ul data-testid="todo-list" className="space-y-4">
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className="border rounded-lg p-4"
                data-testid={`todo-item-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-medium ${
                          todo.completed ? "line-through text-gray-500" : ""
                        }`}
                        data-testid={`todo-title-${index}`}
                      >
                        {todo.title}
                      </h3>
                      <div className="h-max flex gap-3 flex-col items-center">
                        <Badge
                          className={getPriorityColor(todo.priority)}
                          data-testid={`todo-priority-${index}`}
                        >
                          {todo.priority}
                        </Badge>
                        <button
                          onClick={() => handleRemoveTodo(todo.id)}
                          aria-label={`Delete todo ${todo.title}`}
                          data-testid={`delete-todo-${index}`}
                        >
                          <Trash2 size="20px" className="lg:cursor-pointer" />
                        </button>
                      </div>
                    </div>
                    {todo.description && (
                      <p
                        className={`mt-1 text-sm ${
                          todo.completed ? "text-gray-400" : "text-gray-600"
                        }`}
                        data-testid={`todo-description-${index}`}
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
