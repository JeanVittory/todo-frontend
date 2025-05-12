import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Todo } from "../../types/todos";
import TodoList from "../../components/todoList";

vi.mock("../utils", () => ({
  getPriorityColor: (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  },
}));

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      userId: 1,
      title: "Completar proyecto",
      description: "Terminar el proyecto de React",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      userId: 1,
      title: "Estudiar TypeScript",
      description: "Repasar conceptos avanzados",
      completed: true,
      priority: "medium",
    },
  ];

  const mockHandleRemoveTodo = vi.fn();

  it("renders todo list correctly", () => {
    render(
      <TodoList todos={mockTodos} handleRemoveTodo={mockHandleRemoveTodo} />
    );

    const todoItems = screen.getAllByTestId(/^todo-item-/);
    expect(todoItems).toHaveLength(2);

    expect(screen.getByTestId("todo-title-0")).toHaveTextContent(
      "Completar proyecto"
    );
    expect(screen.getByTestId("todo-description-0")).toHaveTextContent(
      "Terminar el proyecto de React"
    );
    expect(screen.getByTestId("todo-priority-0")).toHaveTextContent("high");

    expect(screen.getByTestId("todo-title-1")).toHaveTextContent(
      "Estudiar TypeScript"
    );
    expect(screen.getByTestId("todo-description-1")).toHaveTextContent(
      "Repasar conceptos avanzados"
    );
    expect(screen.getByTestId("todo-priority-1")).toHaveTextContent("medium");
  });

  it('shows "no tasks" message when todos is empty', () => {
    render(<TodoList todos={[]} handleRemoveTodo={mockHandleRemoveTodo} />);
    expect(screen.getByTestId("empty-todo-message")).toBeInTheDocument();
  });

  it("calls handleRemoveTodo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TodoList todos={mockTodos} handleRemoveTodo={mockHandleRemoveTodo} />
    );

    await user.click(screen.getByTestId("delete-todo-0"));

    expect(mockHandleRemoveTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
