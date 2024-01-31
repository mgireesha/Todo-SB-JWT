import axios from 'axios';
import { getAuth, getServiceURI } from '../utils/GlobalFuns';
//const baseURL = 'https://todo-ms-rc-sb.herokuapp.com';
//const baseURL = 'http://localhost:8087';
//const baseURL = '';
const baseURL = getServiceURI();
const iAxios = axios.create({
    baseURL:baseURL,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getAuth()
    },
    timeout:120000
});

iAxios.interceptors.request.use(
    (config) => {
      // Modify the request configuration or add headers
      config.headers.Authorization = "_";
      if(getAuth()!=="")
      config.headers.Authorization = getAuth();
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

export const getUserListsAPI = () =>{
    return iAxios.get('/todo/list/listAllByUser/').then(response => response);
}

export const getTaskListAPI = (listId) =>{
    return iAxios.get(`/todo/task/getTasksByListId/${listId}`).then(response => response);
}

export const getTaskByTaskIdAPI = (taskiId) => {
    return iAxios.get(`/todo/task/${taskiId}/`).then(response => response);
}

export const createListAPI = (list) => {
    return iAxios.post(`/todo/list/`,list).then(response => response);
}

export const deleteListAPI = (payload) => {
    return iAxios.delete(`/todo/list/${payload.list.listId}`).then(response => response);
}

export const createTaskAPI = (task) => {
    return iAxios.post(`todo/task/`,task).then(response => response);
}

export const updateTaskAPI = (task,action) => {
    return iAxios.put(`/todo/task/${task.taskId}/${action}`,task).then(response => response);
}

export const updateListAPI = (payload) => {
    return iAxios.put(`/todo/list/${payload.list.listId}/`,payload.list).then(response => response);
}

export const fetchListOrderAPI = () => {
    return iAxios.get(`/todo/list/get-list-order/`).then(response => response);
}

export const updateListOrderAPI = (payload) => {
    return iAxios.put(`/todo/list/update-list-order/`,{"listOrder":payload.listOrder}).then(response => response);
}

export const deleteTaskAPI = (payload) => {
    return iAxios.delete(`/todo/task/${payload.task.taskId}/`).then(response => response);
}

export const moveTaskAPI = (payload) => {
    return iAxios.put(`/todo/task/moveTask/${payload.task.taskId}/${payload.targetList.listId}`).then(response => response);
}

export const createTaskStepAPI = (payload) => {
    return iAxios.post(`/todo/task/${payload.task.taskId}/taskStep/`,payload.addNxtStepPayload).then(response => response);
}

export const updateTaskStepAPI = (payload) => {
    return iAxios.put(`/todo/task/taskStep/${payload.action}/`,payload.payload).then(response => response);
}

export const deleteTaskStepAPI = (payload) => {
    return iAxios.delete(`/todo/task/taskStep/${payload.stepId}`).then(response => response);
}

export const archiveListAPI = (payload) => {
    return iAxios.put(`/todo/list/archiveList/${payload.list.listId}`).then(response => response);
}

export const fetchHeaderLinksAPI = () => {
    return iAxios.get(`/todo/header-links`).then(response => response);
}

export const fetchMyAccountLinksAPI = () => {
    return iAxios.get(`/todo/user/my-account-links`).then(response => response);
}

export const fetchCurrentUserAPI = () => {
    return iAxios.get(`/todo/user/@self`).then(response => response);
}

export const exportTodoListsAPI = () => {
    return iAxios.get(`/todo/user/export-todo-lists`).then(response => response);
}

//Login / User apis - start
export const registerUserAPI = (payload) => {
    return iAxios.post(`/todo/user/register`,payload).then(response => response);
}

export const checkUNameAvaiabilityAPI = (userName) => {
    return iAxios.post(`/todo/user/username/availability/${userName}`).then(response => response);
}

export const authenticateUserAPI = (payload) => {
    return iAxios.post(`/todo/user/authenticate`,payload).then(response => response);
}

export const changePasswordAPI = (authenticationRequest) => {
    return iAxios.put(`/todo/user/password`,authenticationRequest).then(response => response);
}
//Login / User apis - end