import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoState {
  items: Todo[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TodoState = {
  items: [],
  status: "idle",
  error: null,
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("/api/todos")
  return response.json()
})

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false }),
    })
    return response.json()
  }
)

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    })
    return response.json()
  }
)

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    return id
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find((item) => item.id === action.payload.id)
        if (todo) {
          todo.completed = action.payload.completed
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export default todoSlice.reducer
