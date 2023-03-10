import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { BsCalendar2Week } from "react-icons/bs";

export const TodoDatePicker = (props) => {
    const [isOpen,setIsOpen] = useState(false);
    
    return (
        <div style={{ position: 'relative', display: 'block' }} >
            <ReactDatePicker
                selected={props.date}
                onChange={(date) => props.setDate(date)}
                popperPlacement="top-end" dateFormat="MMM d, yyyy h:mm aa" placeholderText={props.placeholderText}
                className="form-control react-datepicker-ignore-onclickoutside" popperClassName={props.popperClassName}
                showTimeInput showMonthDropdown showYearDropdown dropdownMode="select"
                open={isOpen}
                onFocus={()=>setIsOpen(true)} onClick={()=>setIsOpen(true)} 
                onClickOutside={()=>setIsOpen(false)} shouldCloseOnSelect={false} 
            >
                <button className="btn btn-sm btn-outline-secondary" 
                    style={{position:'absolute',bottom:'11px',right:'9px'}}
                    onClick={()=>{setIsOpen(false);document.querySelector('.react-datepicker__portal').style.display='none'}}
                >Close</button>
            </ReactDatePicker>
            <BsCalendar2Week className='date-picker-calender-icon' onClick={()=>setIsOpen(true)} />
        </div>
    )
}