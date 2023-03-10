import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nbsp from '../Nbsp.js';
import { addNextStep, deleteTaskStep, updatetaskStep } from '../redux/task/taskActions.js';
import { CREATE_TASK_STEP_SUCCESS } from '../redux/task/taskActionTypes.js';

export const TaskSteps = ({todoList}) => {

    const dispatch = useDispatch();
    const [showAddNxtFld, setShowAddNxtFld] = useState(false);
    const phase = useSelector(state => state.task.phase);
    const task = useSelector(state => state.task.taskDetail);
    const onSetShowAddNxtFld = (event,value) => {
        setShowAddNxtFld(value);
    }

    useEffect(()=>{
        if(document.getElementById('add-nxt-fld-')!==null){
            document.getElementById('add-nxt-fld-').focus();
            if(showAddNxtFld){
                showRenameFld('','show');
            }
        }
    },[showAddNxtFld]);

    const initAddNextStep = () => {
        const stepName = document.getElementById('add-nxt-fld-');
        if(stepName.value===''){
            setShowAddNxtFld(false);
            return false;
        }
        const addNxtStepPayload = {
            stepName:stepName.value
        }
        dispatch(addNextStep(task,addNxtStepPayload,todoList))
    }
    
    useEffect(()=>{
        if(phase===CREATE_TASK_STEP_SUCCESS){
            setShowAddNxtFld(false);
        }
    },[phase])

    const initUpdateStep =  (event,stepId,action) => {
        const updateStepPayLoad = {
            stepId
        }
        if(action==='complete'){
            updateStepPayLoad.completed = event.target.checked;
        }else if(action==='stepName'){
            const txtArea = document.getElementById('add-nxt-fld-'+stepId);
            const stepIndex = txtArea.getAttribute('stepindex');
            const currStepName = task.taskSteps[stepIndex].stepName;
            if(currStepName!==txtArea.value){
                updateStepPayLoad.stepName = txtArea.value;
            }else{
                showRenameFld(stepId,'hide');
                return false;
            }
        }
        dispatch(updatetaskStep(updateStepPayLoad,action));
    }

    const initDeleteStep = (stepId) => {
        dispatch(deleteTaskStep(stepId));
    }

    const showRenameFld = (stepId,action) => {
        if(action==='show'){
            document.getElementById('add-nxt-arr-'+stepId).style.display='inline';
            document.getElementById('add-nxt-cnl-'+stepId).style.display='inline';
            if(document.getElementById('add-nxt-label-'+stepId)!==null){
                document.getElementById('add-nxt-label-'+stepId).style.display='none';
                document.getElementById('add-nxt-fld-'+stepId).value
                    = document.getElementById('add-nxt-label-'+stepId).innerHTML;
                document.getElementById('add-nxt-fld-'+stepId).style.display='inline';
                document.getElementById('add-nxt-fld-'+stepId).focus();
                document.getElementById('step-rmv-label-'+stepId).style.display='none';
            }
        }else{
            document.getElementById('add-nxt-arr-'+stepId).style.display='none';
            document.getElementById('add-nxt-cnl-'+stepId).style.display='none';
            document.getElementById('add-nxt-fld-'+stepId).style.display='none';
            setShowAddNxtFld(false);
            if(document.getElementById('add-nxt-label-'+stepId)!==null){
                document.getElementById('add-nxt-label-'+stepId).style.display='';
                document.getElementById('step-rmv-label-'+stepId).style.display='inline-block';
            }
        }
        
    }

    return (
        <div style={{ fontSize: 13 }}>
                <div style={{marginTop:10}}>
                    {task!==null && task.taskSteps!==null && task.taskSteps.length !== 0 && task.taskSteps.map((step,index) => 
                            <div className='task-step-elem'>
                                <label style={{width:10+'%'}}>
                                    <input type='checkbox' className='task-step-chkbx' checked={step.completed} onChange={(event)=>initUpdateStep(event,step.stepId,'complete')}  />
                                </label>
                                <label className={step.completed ? 'strike-line' : ''} id={'add-nxt-label-'+step.stepId} style={{color:'#b9b4b4',cursor:'text', width:80+'%' }} key={index} onClick={()=>showRenameFld(step.stepId,'show')}>{step.stepName}</label>
                                <textarea stepindex={index} id={'add-nxt-fld-'+step.stepId} className='c-ta-stps' placeholder='Add step'  style={{display:'none',width:72+'%'}}></textarea>
                                <label id={'add-nxt-arr-'+step.stepId} style={{display:'none',cursor:'pointer',fontSize:23}} onClick={(event)=>initUpdateStep(event,step.stepId,'stepName')}>&rarr;</label>
                                <span id={'add-nxt-cnl-'+step.stepId} style={{display:'none',cursor:'pointer',fontSize:15}} onClick={()=>showRenameFld(step.stepId,'hide')}><Nbsp/><Nbsp/>&#x2715;</span>
                                <label id={'step-rmv-label-'+step.stepId} className='step-rmv-label' style={{width:10+'%'}} onClick={()=>initDeleteStep(step.stepId)}>X</label>
                            </div>
                    )}
                    {!showAddNxtFld && <div className='task-step-elem' style={{borderBottom:'none'}} onClick={(event)=>onSetShowAddNxtFld(event,true)}>
                        <span className='link-look' style={{textDecoration: 'none',color:'#577db5'}} >+ Next Step</span>
                    </div>}
                </div>
            <div>
                {showAddNxtFld && 
                <div style={{borderBottom:'1px solid grey'}}>
                    <textarea id='add-nxt-fld-' className='c-ta' placeholder='Add step'></textarea>
                    <label id={'add-nxt-arr-'} style={{display:'none',cursor:'pointer',fontSize:23}} onClick={()=>initAddNextStep()}>&rarr;</label>
                    <span id={'add-nxt-cnl-'} style={{display:'none',cursor:'pointer',fontSize:15}} onClick={()=>showRenameFld('','hide')}><Nbsp/><Nbsp/>&#x2715;</span>
                </div> 
                }
            </div>
        </div>
    );
}