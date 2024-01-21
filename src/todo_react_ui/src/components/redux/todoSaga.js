import {all} from 'redux-saga/effects'
import { onExportTodoLists, onFetchCurrentUser, onFetchHeaderLinks, onFetchMyAccountLinks } from './common/commonSaga';
import { onAddListToArchive, onCreateList, onDeleteList, onFetchListOrder, onFetchUserLists, onUpdateList, onUpdateListOrder } from './list/listSaga';
import { onCreateTask, onCreateTaskStep, onDeleteTask, onDeleteTaskStep, onFetchTask, onFetchTaskList, onMoveTask, onUpdateTask, onUpdateTaskStep } from './task/taskSaga';
import { onPasswordChange } from './login/loginSaga';

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
        onDeleteTaskStep(),
        onFetchListOrder(),
        onUpdateListOrder(),
        onFetchHeaderLinks(),
        onFetchMyAccountLinks(),
        onFetchCurrentUser(),
        onPasswordChange(),
        onExportTodoLists()
     ])
}
