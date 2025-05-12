import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store";
import { addTodo, getTodos, removeTodo } from "../services/todos";
import type { CreateTodo, Todo } from "../types/todos";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/todoList";
import { handleApiError } from "../utils";
import type { AxiosError } from "axios";

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { signOut } = useAuth();
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);
  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  useEffect(() => {
    getTodos()
      .then((response: Todo[]) => {
        setTodos(response);
      })
      .catch((error: AxiosError) => {
        if (error.status === 401) {
          signOut();
          clearUser();
          navigate("/", { replace: true });
        } else {
          handleApiError(error);
        }
      });
  }, [navigate, clearUser, signOut]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleAddTodo = async (newTodo: CreateTodo) => {
    try {
      const todoAdded = await addTodo(newTodo);
      setTodos((prev) => [...prev, todoAdded]);
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleRemoveTodo = async (todoId: number) => {
    try {
      const newTodoList = await removeTodo(todoId);

      setTodos(newTodoList);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Task manager</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          <div>
            <TodoList todos={todos} handleRemoveTodo={handleRemoveTodo} />
          </div>
        </div>
      </main>
    </div>
  );
}
