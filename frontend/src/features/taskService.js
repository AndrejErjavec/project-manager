import axios from '../config/axios';

const TASK_URL = '/api/task/';

const createTask = async (taskData, projectId) => {
  const response = await axios.post(TASK_URL + `create?id=${projectId}`, taskData);
  return response.data;
}

const updateTask = async (taskData) => {

};

const deleteTask = async (taskId) => {
  const response = await axios.delete(TASK_URL + `delete?id=${taskId}`);
  return response.data;
}

const getTaskById = async (taskId) => {
  const response = await axios.get(TASK_URL + `?id=${taskId}`);
  return response.data;
}

const getTaskUsers = async (taskId) => {
  const response = await axios.get(TASK_URL + `users?id=${taskId}`);
  return response.data;
}

const getUsersNotInTask = async (taskId) => {
  const response = await axios.get(TASK_URL + `notmembers?id=${taskId}`);
  return response.data;
}

const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTaskUsers,
  getUsersNotInTask
}

export default taskService;