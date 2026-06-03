import  {type FC, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import type { Task } from "../../features/board/types"
import Column from "../Column/Column"
import TaskForm from "../../components/TaskForm/TaskForm"
import ToolBar from "../../ui/ToolBar/ToolBar"
import { IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import style from "./KanbanBoard.module.css"


const KanbanBoard: FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchQuery = useAppSelector(state => state.board.searchQuery)

  const tasksStore = useAppSelector(state => state.board.tasks) 
  const selectedPriorities = useAppSelector(state => state.board.selectedPriorities)

  const tasksStoreQuery = tasksStore.filter(t => {

    const matchesTitle = t.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDescription = t.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSearch = matchesTitle || matchesDescription

    const matchesPriorities = selectedPriorities.length === 0 || selectedPriorities.includes(t.priority)
    return matchesSearch && matchesPriorities

  })

  console.dir(tasksStoreQuery)

  const toDoTasks = tasksStoreQuery.filter(t => t.status === 'todo')
  const inProgressTasks = tasksStoreQuery.filter(t => t.status === 'in-progress')
  const doneTasks = tasksStoreQuery.filter(t => t.status === 'done') 


  return (
    <section className={style.boardContainer}>
    
      <div className={style.boardAddTaskBox}>
        <IconButton 
          className="board__boardAddTaskBtn"
          onClick={() => setIsModalOpen(true)}
          sx={{
            '&.MuiIconButton-root': {
              border: '1px solid rgb(255, 204, 0)',
              borderRadius: '8px',
              padding: '6px 8px',
            }
          }}
        >
          <AddIcon 
            className="board__addTaskBtnIcon"
            sx={{
              '&.MuiSvgIcon-root': {
                fontSize: '1.1rem',
                color: '#fff'
              }
            }}
          />
          <span style={{color: '#fff', fontSize: '1rem'}}>Add task</span>
        </IconButton>
      </div>

      <ToolBar />


      <div className={style.boardGrid}>
        <Column title='Backlog' status='todo' tasks={toDoTasks}/>
        <Column title='In Progress' status='in-progress' tasks={inProgressTasks}/>
        <Column title='Done' status='done' tasks={doneTasks}/>
      </div>

      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)}/>}
    </section>
  )
}

export default KanbanBoard