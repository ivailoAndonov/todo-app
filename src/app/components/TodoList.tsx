import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"
import { RootState, AppDispatch } from "../store/store"
import { fetchTodos, toggleTodo, deleteTodo, Todo } from "../store/todoSlice"

import ItemActionButton from "./ItemActionButton"

interface GroupedItems {
  completed: Todo[]
  uncompleted: Todo[]
}

const ItemListTitle: React.FC<{ children: ReactNode }> = (props): ReactNode => (
  <div className="mt-5">{props.children}</div>
)

const NoTodos: React.FC<{ children: ReactNode }> = (props): ReactNode => (
  <div className="text-center mt-5">{props.children}</div>
)

function TodoList(): React.ReactNode {
  const dispatch = useDispatch<AppDispatch>()
  const todos: Todo[] = useSelector((state: RootState) => state.todos.items)
  const status: string = useSelector((state: RootState) => state.todos.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos())
    }
  }, [dispatch, status])

  if (status === "loading") {
    return <div className="text-center">Loading...</div>
  }

  const groupedItems = todos.reduce(
    (acc: GroupedItems, item: Todo) => {
      acc[item.completed ? "completed" : "uncompleted"].push(item)
      return acc
    },
    { completed: [], uncompleted: [] }
  )

  const { completed, uncompleted } = groupedItems

  return (
    <div>
      {uncompleted.length > 0 ? (
        <>
          <ItemListTitle>Tasks to do - {uncompleted.length}</ItemListTitle>
          <ul className="space-y-3">
            {uncompleted.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow todo-item"
              >
                <span className="truncate">{todo.text}</span>
                <div className="flex space-x-2">
                  <ItemActionButton
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    <FontAwesomeIcon icon={faCheck} className="fa-light" />
                  </ItemActionButton>
                  <ItemActionButton
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    <FontAwesomeIcon icon={faTrash} className="fa-light" />
                  </ItemActionButton>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoTodos>No added todos</NoTodos>
      )}
      {completed.length > 0 ? (
        <>
          <ItemListTitle>Done - {completed.length}</ItemListTitle>
          <ul className="space-y-3">
            {completed.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow  todo-item"
              >
                <span className="line-through text-gray-500 todo-item-completed truncate">
                  {todo.text}
                </span>
                <div className="flex space-x-2">
                  <ItemActionButton
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    <FontAwesomeIcon icon={faTrash} className="fa-light" />
                  </ItemActionButton>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoTodos>No completed todos</NoTodos>
      )}
    </div>
  )
}

export default TodoList
