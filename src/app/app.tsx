import { Provider } from "react-redux"
import { store } from "./store/store"

import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-8 app-wrapper">
        <div className="max-w-2xl mx-auto px-4">
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </Provider>
  )
}

export default App
