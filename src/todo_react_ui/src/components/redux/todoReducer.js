import {combineReducers} from 'redux';
import listReducer from './list/listReducer';
import {taskReducer} from './task/taskReducer';

export const todoReducer = combineReducers({
    list:listReducer,
    task:taskReducer
});