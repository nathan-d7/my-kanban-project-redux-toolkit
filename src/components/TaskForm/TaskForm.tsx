import { type FC, useState } from "react"
import style from "./TaskForm.module.css"
import { IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { useAppDispatch } from "../../app/hooks"
import { addTask } from "../../features/board/boardSlice"

type TaskFormProps = {
  onClose: () => void
}

const TaskForm: FC<TaskFormProps> = ({onClose}) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low' as 'low' | 'medium' | 'high'
  })

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setErrors(prev => ({ ...prev, [name]: '' }))
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {

    const localErrors = {
      title: !formData.title.trim() ? 'Title is required' : '',
      description: !formData.description.trim() ? 'Description is required' : ''
    }

    if(localErrors.title || localErrors.description) {
      setErrors(localErrors)
      return false
    }

    return true
      
  }

  const dispatch = useAppDispatch()

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValidated = validateForm()
    if(!isValidated) return

    dispatch(addTask(
      {
        id: crypto.randomUUID(),
        ...formData,
        status: 'todo',
        createdAt: new Date().toLocaleDateString('en-US', options)
    }))
    
    onClose()
  }

  return (
    <div className={style.taskFormContainer}>
      <div className={style.modalOverlay} onClick={onClose}>

        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>

          <div className={style.modalHeader}>
            <h3>Create New Task</h3>
            <IconButton type="button" 
              className={style.closeBtn} 
              onClick={onClose}
              sx={{
                padding: '0'
              }}
            >
              <CancelRoundedIcon 
                sx={{
                  fill: '#ea2c2c',
                  path: '#fff'
                }}
              />
            </IconButton>
          </div>

          <form 
            className={style.taskFormBox}
            onSubmit={handleSubmit}
          >
            <input 
              className={style.taskFormInput} 
              type='text' 
              placeholder="Task title..."
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className={style.errorText}>{errors.title}</span>}

            <textarea 
              className={style.taskFormDescrp} 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add description..."
            >
            </textarea>
            {errors.description && <span className={style.errorText}>{errors.description}</span>}

            <div className={style.taskFormBottom}>
              <div className={style.selectWrapper}>
                <label htmlFor="priority">Priority: </label>
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={style.taskFormSelect}
                >
                  <option id="low">Low</option>
                  <option id="medium">Medium</option>
                  <option id="high">High</option>
                </select>
              </div>
              <IconButton 
                type='submit'
                sx={{
                  '&.MuiIconButton-root': {
                    padding: 0
                  }
                }}
              >
                <ControlPointIcon sx={{ fontSize: '1.8rem', color: '#4ea8de' }} />
              </IconButton>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default TaskForm