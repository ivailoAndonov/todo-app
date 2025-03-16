import { useState } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { addTodo } from "../store/todoSlice"
import type { AppDispatch } from "../store/store"

function AddTodo(): React.ReactNode {
  const [text, setText] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text))
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 rounded-lg focus:outline-none add-input"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 bg-blue-500 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed add-button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  )
}

export default AddTodo
