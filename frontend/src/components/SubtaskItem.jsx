import {useEffect, useState, useContext} from 'react';
import subtaskService from '../features/subtaskService';
import SubtaskContext from '../context/store/SubtaskStore';
import '../css/SubtaskItem.css'

const SubtaskItem = ({subtask, setProgress}) =>{
  const [completed, setCompleted] = useState(subtask.completed);
  const {subtaskDispatch} = useContext(SubtaskContext)

  const handleChange = (e) => {
    setCompleted(completed => !completed);
    subtaskService.updateSubtask({name: subtask.name, priority: subtask.priority, completed: completed}, subtask.id)
    .then((response) => {})
  };


  return (
    <div className="subtask-item">
      <p>{subtask.name}</p>
      <input type="checkbox" checked={completed} onChange={handleChange}/>
    </div>
  )
}

export default SubtaskItem;