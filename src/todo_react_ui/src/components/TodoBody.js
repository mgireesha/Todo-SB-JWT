import {React, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import { TodoList } from "./list/TodoList";
import { TodoTask } from "./task/TodoTask";
import { TaskDetails } from "./task-detail/TaskDetails";
import { fetchListOrder, fethUserLists, setIsMobileDevice } from "./redux/list/listActions";
import { LOADING } from "./redux/todoActionTypes";

import { disableDiv, isMobile } from "./utils/GlobalFuns";
import { enableDiv } from "./utils/GlobalFuns";
import { setShowTasks, setTaskDetailShow } from "./redux/task/taskActions";
import { fetchHeaderLinks } from "./redux/common/commonActions";

export const TodoBody = () => {

    const dispatch = useDispatch();
    const listPhase = useSelector(state => state.list.phase);
    const taskPhase = useSelector(state => state.task.phase);
    const showTaskDetls = useSelector(state => state.task.taskDetailShow);
    const showTasks = useSelector(state => state.task.showTasks);
    const showLists = useSelector(state => state.list.showLists);

    useEffect(()=>{
        if(listPhase === LOADING || taskPhase === LOADING){
            disableDiv();
        }else{
            enableDiv();
        }
    },[listPhase,taskPhase]);

    useEffect(()=>{
        if(isMobile()){
            dispatch(setIsMobileDevice(true));
            dispatch(setShowTasks(false));
            dispatch(setTaskDetailShow(false));
            dispatch(fethUserLists(true));
        }else{
            dispatch(fethUserLists(false));
        }
        dispatch(fetchHeaderLinks());
        dispatch(fetchListOrder());
    },[dispatch]);

    return(
        <div className="row" id="main-body-div">
            {showLists && <TodoList />}
            {showTasks && <TodoTask />}
            {showTaskDetls && <TaskDetails />}
        </div>
    );
}