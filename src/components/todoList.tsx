import { ListChecks, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import type { Priority, Todo } from "../types/todos";

interface TodoListProps {
  todos: Todo[];
  handleRemoveTodo: (todoId: number) => void;
}

export default function TodoList({ todos, handleRemoveTodo }: TodoListProps) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          Mis Tareas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!todos || todos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No hay tareas pendientes
          </p>
        ) : (
          <ul className="space-y-4">
            {todos &&
              todos.map((todo) => (
                <li key={todo.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox checked={todo.completed} className="mt-1" />
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
