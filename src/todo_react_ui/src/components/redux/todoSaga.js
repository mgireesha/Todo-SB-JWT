import {all} from 'redux-saga/effects'
import { onAddListToArchive, onCreateList, onDeleteList, onFetchUserLists, onUpdateList } from './list/listSaga';
import { onCreateTask, onCreateTaskStep, onDeleteTask, onDeleteTaskStep, onFetchTask, onFetchTaskList, onMoveTask, onUpdateTask, onUpdateTaskStep } from './task/taskSaga';

export function* todoSaga() {
     yield all([
        onFetchUserLists(),
        onCreateList(),
        onUpdateList(),
        onDeleteList(),
        onAddListToArchive(),
        onFetchTaskList(),
        onFetchTask(),
        onCreateTask(),
        onUpdateTask(),
        onDeleteTask(),
        onMoveTask(),
        onCreateTaskStep(),
        onUpdateTaskStep(),
        onDeleteTaskStep()
     ])
}
