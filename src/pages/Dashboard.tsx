import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store";
import { getTodosByUserEmail } from "../services/todos";
import type { Todo } from "../types/todos";

export default function Dashboard() {
  const user = useAuthStore((state) => state.getCurrentUser());
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodosByUserEmail().then((response: Todo[]) => {
      setTodos(response);
    });
  }, []);
  console.log(user);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Bienvenido a tu Dashboard</h1>
          <p className="text-gray-600">
            Este es el contenido principal de tu dashboard. Aquí puedes mostrar
            estadísticas, gráficos, tablas o cualquier otra información
            relevante para tu aplicación.
          </p>
        </div>
      </main>
    </div>
  );
}
