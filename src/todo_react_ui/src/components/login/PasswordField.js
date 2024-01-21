import { React, useEffect, useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { CHANGE_PASSWORD_SUCCESS } from '../redux/login/loginActionTypes';

export const PasswordField = (props) => {
    const loginPhase = useSelector(state => state.login.phase);
    const [showPwd, setShowPwd] = useState(false);
    useEffect(() => {
		if(loginPhase === CHANGE_PASSWORD_SUCCESS){
			setShowPwd(false);
        }
    }, [loginPhase]);
    return (
        <div className='relative-div-zero-padding'>
            {showPwd ?
                <AiOutlineEye className='password-eye-icon' onClick={() => setShowPwd(false)} />
                :
                <AiOutlineEyeInvisible className='password-eye-icon' onClick={() => setShowPwd(true)} />
            }
            <input className="form-control signup-input" 
                type={showPwd ? 'text' : 'password'} 
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                onKeyUp={props.onKeyUp?(event)=>props.onKeyUp(event):null}
                required />
        </div>
    )
}