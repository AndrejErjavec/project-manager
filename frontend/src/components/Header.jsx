import { useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaTasks, FaSignOutAlt} from 'react-icons/fa';
import UserContext from '../context/store/UserStore';
import ProjectContext from '../context/store/ProjectStore';
import TaskContext from '../context/store/TaskStore';
import authService from '../features/authService';
import UserTicket from './UserTicket';
import '../css/Header.css';

const Header = () => {
  const {user, dispatch} = useContext(UserContext);
  const {projectDispatch} = useContext(ProjectContext);
  const {taskDispatch} = useContext(TaskContext);
  const navigate = useNavigate();
  
  const onLogout = () => {
    authService.logout();
    dispatch({type: 'LOGOUT'});
    taskDispatch({type: 'CLEAR'});
    projectDispatch(({type: 'CLEAR'}));
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-title">
        <FaTasks size="30px"></FaTasks>
        <h1>Project manager</h1>
      </div>
      <div className="header-right">
        {user && <UserTicket user={user}></UserTicket>}
        {user && <FaSignOutAlt onClick={onLogout} className="logout-btn"></FaSignOutAlt>}
      </div>
    </header>
  )
}

export default Header;