import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { BoardState, Task, ColumnStatus } from "./types"

const loadTasksFromLocalStorage = (): Task[] => {
  const rawData = localStorage.getItem('kanban-tasks')
  if(!rawData) return []

  try {
    return JSON.parse(rawData) as Task[]
  } catch (error) {
    console.error("Error parsing tasks from LocalStorage:", error)
    return []
  }
}

const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
}

const initialState: BoardState = {
  tasks: loadTasksFromLocalStorage(),
  searchQuery: '',
  selectedPriorities: []
}

type MoveTaskPayload = {
  id: string,
  newStatus: ColumnStatus
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload)
      saveTasksToLocalStorage(state.tasks)
    },
    deleteTasks(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      saveTasksToLocalStorage(state.tasks)
    },
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const task = state.tasks.find(t => t.id === action.payload.id)

      if(task) {
        task.status = action.payload.newStatus
      }

      saveTasksToLocalStorage(state.tasks)
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setPrioritiesFilter(state, action: PayloadAction<('low' | 'medium' | 'high')[]>) {
      state.selectedPriorities = action.payload
    }
  }
})

export const {addTask, deleteTasks, moveTask, setSearchQuery, setPrioritiesFilter} = boardSlice.actions
export default boardSlice.reducer
