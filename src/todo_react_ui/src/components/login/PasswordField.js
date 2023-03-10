import { React, useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

export const PasswordField = (props) => {
    const [showPwd, setShowPwd] = useState(false);
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