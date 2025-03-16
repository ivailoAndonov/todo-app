import { http, HttpResponse } from "msw"
import { Todo } from "../store/todoSlice"

let todos: Todo[] = [
  { id: "1", text: "Learn Redux Toolkit", completed: false },
  { id: "2", text: "Build Todo App", completed: false },
]

export const handlers = [
  http.get("/api/todos", () => {
    return HttpResponse.json(todos)
  }),

  http.post("/api/todos", async ({ request }) => {
    const newTodo = await request.json()
    const todo = {
      id: String(Date.now()),
      ...(newTodo as any),
    }
    todos.push(todo)
    return HttpResponse.json(todo)
  }),

  http.patch("/api/todos/:id", async ({ params }) => {
    const { id } = params
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      todo.completed = true
      return HttpResponse.json(todo)
    }
    return new HttpResponse(null, { status: 404 })
  }),

  http.delete("/api/todos/:id", ({ params }) => {
    const { id } = params
    todos = todos.filter((t) => t.id !== id)
    return new HttpResponse(null, { status: 200 })
  }),
]
