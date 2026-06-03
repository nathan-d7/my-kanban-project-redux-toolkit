import { useState, type FC } from "react"
import { IconButton } from "@mui/material"
import SortRoundedIcon from '@mui/icons-material/SortRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import style from "./PriorityFilter.module.css"
import { useAppDispatch } from "../../app/hooks"
import { setPrioritiesFilter } from "../../features/board/boardSlice"

const PriorityFilter: FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [localPriorities, setlocalPriorities] = useState<('low' | 'medium' | 'high')[]>([])

  const dispatch = useAppDispatch()

  const handleApplyFilters = () => {
    dispatch(setPrioritiesFilter(localPriorities))
    setIsOpen(false)
    return
  }

  const handleCheckboxChange = (priority: 'low' | 'medium' | 'high') => {

    if(localPriorities.includes(priority)) {
      setlocalPriorities(prev => prev.filter(p => p !== priority))
    } else {
      setlocalPriorities(prev => [...prev, priority])
    }
  }

  return (
    <div className={style.priorFilterContainer}>
      <SortRoundedIcon className={style.filterButton} onClick={() => setIsOpen(prev => !prev)}/>
      {isOpen && 
        (<div className={style.popUpWindow}>
          <h4 className={style.popUpWindowTitle}>Filter by priority</h4>

          <div className={style.checkBoxGroup}>
            <label 
              className={style.checkBoxLabel}>
              <input
                className={style.hiddenCheckbox}
                type="checkbox" 
                checked={localPriorities.includes('low')}
                onChange={() => handleCheckboxChange('low')}
              />
              <span className={style.labelText}>Low</span>
              <span className={style.customCheckbox}></span>
            </label>
            <label 
              className={style.checkBoxLabel}>
              <input
                className={style.hiddenCheckbox} 
                type="checkbox" 
                checked={localPriorities.includes('medium')}
                onChange={() => handleCheckboxChange('medium')}
              />
              <span className={style.labelText}>Medium</span>
              <span className={style.customCheckbox}></span>
            </label>
            <label 
              className={style.checkBoxLabel}>
              <input
                className={style.hiddenCheckbox} 
                type="checkbox" 
                checked={localPriorities.includes('high')}
                onChange={() => handleCheckboxChange('high')}
              />
              <span className={style.labelText}>High</span>
              <span className={style.customCheckbox}></span>
            </label>
          </div>

          <IconButton 
            className={style.popUpWindowApplyButton} 
            onClick={handleApplyFilters}
            sx={{
             '&.MuiIconButton-root': {
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 12px',
              backgroundColor: 'transparent',
              border: '2px solid #ffcc00',
              borderRadius: '6px',
              marginTop: '6px',
             }
            }}
          >
            <SearchRoundedIcon 
              sx={{
                '&.MuiSvgIcon-root': {
                  fontSize: '1.1rem',
                  fill: '#fff'
                }
              }}
            />
            <span className={style.popUpWindowApplyButtonText}>Apply</span>
          </IconButton>
        </div>)
      }
    </div>
  )
}

export default PriorityFilter