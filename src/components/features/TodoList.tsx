'use client'

import { useState } from 'react'
import { MoreVertical, Plus, Check, X } from 'lucide-react'

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const initialTodos: Todo[] = [
  {
    id: 1,
    task: 'Review Q2 financial reports',
    completed: false,
    priority: 'high'
  },
  {
    id: 2,
    task: 'Prepare board meeting presentation',
    completed: true,
    priority: 'high'
  },
  {
    id: 3,
    task: 'Update team on project status',
    completed: false,
    priority: 'medium'
  },
  {
    id: 4,
    task: 'Schedule client follow-up calls',
    completed: false,
    priority: 'low'
  }
]

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTask, setNewTask] = useState('')

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const newTodo: Todo = {
      id: todos.length + 1,
      task: newTask.trim(),
      completed: false,
      priority: 'medium'
    }

    setTodos([...todos, newTodo])
    setNewTask('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Tasks</h2>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <MoreVertical size={20} />
        </button>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="p-2 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors group"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                ${todo.completed
                  ? 'bg-success-DEFAULT border-success-DEFAULT dark:bg-success-dark dark:border-success-dark text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-DEFAULT dark:hover:border-primary-dark'
                }`}
            >
              {todo.completed && <Check size={14} />}
            </button>
            <span
              className={`flex-1 text-sm ${
                todo.completed 
                  ? 'text-gray-400 dark:text-gray-500 line-through' 
                  : 'text-text-light dark:text-text-dark'
              }`}
            >
              {todo.task}
            </span>
            <div
              className={`flex items-center gap-2 ${
                todo.priority === 'high'
                  ? 'text-warning-DEFAULT dark:text-warning-dark'
                  : todo.priority === 'medium'
                  ? 'text-primary-DEFAULT dark:text-primary-dark'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="text-xs uppercase">{todo.priority}</span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-warning-DEFAULT dark:hover:text-warning-dark transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 