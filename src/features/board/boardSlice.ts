import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { BoardState, Task, ColumnStatus } from "./types"

const initialState: BoardState = {
  tasks: [
    {
      id: '1',
      title: 'Изучить основы Redux Toolkit',
      description: 'Разобраться с configureStore, createSlice и типизацией',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: '2',
      title: 'Сделать стильную верстку доски',
      description: 'Написать CSS-модули для темной темы приложения',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: '3',
      title: 'Повторить TypeScript',
      description: 'Повторить интерфейсы, типы и generics',
      status: 'done',
      priority: 'low',
      createdAt: new Date().toLocaleDateString(),
    }
  ],
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
    },
    deleteTasks(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const task = state.tasks.find(t => t.id === action.payload.id)

      if(task) {
        task.status = action.payload.newStatus
      }
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
