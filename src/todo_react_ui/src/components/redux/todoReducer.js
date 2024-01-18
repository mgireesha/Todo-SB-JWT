import {combineReducers} from 'redux';
import commonReducer from './common/commonReducer';
import listReducer from './list/listReducer';
import {taskReducer} from './task/taskReducer';

export const todoReducer = combineReducers({
    list:listReducer,
    task:taskReducer,
    common:commonReducer
});