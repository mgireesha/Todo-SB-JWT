import {React, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import { TodoList } from "./list/TodoList";
import { TodoTask } from "./task/TodoTask";
import { TaskDetails } from "./task-detail/TaskDetails";
import { fethUserLists, setIsMobileDevice } from "./redux/list/listActions";
import { LOADING } from "./redux/todoActionTypes";

import { disableDiv, isMobile } from "./utils/GlobalFuns";
import { enableDiv } from "./utils/GlobalFuns";
import { setShowTasks, setTaskDetailShow } from "./redux/task/taskActions";

export const TodoBody = () => {

    const dispatch = useDispatch();
    const listPhase = useSelector(state => state.list.phase);
    const taskPhase = useSelector(state => state.task.phase);
    const showTaskDetls = useSelector(state => state.task.taskDetailShow);
    const showTasks = useSelector(state => state.task.showTasks);
    const showLists = useSelector(state => state.list.showLists);
    useEffect(()=>{
        document.getElementById('main-body-div').style.height 
			= (window.innerHeight - 40)+"px";
        document.getElementById('list-item-main-comb').style.minHeight
			= (window.innerHeight - 60 - document.getElementById('list-item-add').offsetHeight)+"px";
		document.getElementById('list-item-main-comb').style.maxHeight
			= (window.innerHeight - 60 - document.getElementById('list-item-add').offsetHeight)+"px";
		if(document.getElementById('task-item-main')!==null){
			document.getElementById('task-item-main').style.minHeight
				= (window.innerHeight - 135 - document.getElementById('list-item-add').offsetHeight)+"px";
			document.getElementById('task-item-main').style.maxHeight
				= (window.innerHeight - 135 - document.getElementById('list-item-add').offsetHeight)+"px";
        }
    },[])

    useEffect(()=>{
		if(showTaskDetls && document.getElementById('task-detail-main')!==null){
			document.getElementById('task-detail-main').style.minHeight
			= (window.innerHeight - 50 - document.getElementById('task-detail-delete').offsetHeight)+"px";
			document.getElementById('task-detail-main').style.maxHeight
			= (window.innerHeight - 50 - document.getElementById('task-detail-delete').offsetHeight)+"px";
		}
	},[showTaskDetls])

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
    },[dispatch]);

    return(
        <div className="row" id="main-body-div">
            {showLists && <TodoList />}
            {showTasks && <TodoTask />}
            {showTaskDetls && <TaskDetails />}
        </div>
    );
}