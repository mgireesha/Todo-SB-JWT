import React, { useEffect, useState } from "react";

import {ConfirmPopup} from './ConfirmPopup.js';
import { disableDiv, enableDiv, getAuth, getServiceURI } from "./utils/GlobalFuns.js";

export const ManageUsers = () => {
    const [users,setUsers] = useState([]);

    const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdUser,setSelctdUser] = useState(null);
	const onSetShowConfirmPopup = (event,showCnfrmPp,userId) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setSelctdUser(userId);
		setShowConfirmPopup(showCnfrmPp);
	}

    useEffect(()=>{
        const fetchUsers = async() => {
            const settings = {
                method:'GET',
                headers:{
                    'Authorization':getAuth()
                }
            }
            const response = await fetch(`${getServiceURI()}/todo/ManageUsers`,settings);
            const data = await response.json();
            setUsers(data);
        }
        fetchUsers();
    },[]);

    const deleteUser = async(userId) => {
        const settings = {
            method:'DELETE',
            headers:{
                'Authorization':getAuth()
            }
        }
        disableDiv();
        const response = await fetch(`${getServiceURI()}/todo/user/${userId}`,settings);
        const data = await response.json();
        if(data.status==='success'){
            let tempUsers = [...users];
            tempUsers = tempUsers.filter(function(user){
                return user.id!==userId;
            });
            setUsers(tempUsers);
            setShowConfirmPopup(false);
        }
        enableDiv();
    }


    return(
        <div className="container-fluid" style={{color:'beige'}}>
            <h1><span style={{fontStyle:'italic'}}>Manage Users</span> 〉</h1>
            <div className="container-fluid user-table">
                <div className="row user-table-header" id="user-table-header" style={{borderTop:'1px solid darkgray'}}>
                    <label className="col-sm-1 user-table-elem">User ID</label>
                    <label className="col-sm-2 user-table-elem">Name</label>
                    <label className="col-sm-2 user-table-elem">UserName</label>
                    <label className="col-sm-2 user-table-elem">Roles</label>
                    <label className="col-sm-2 user-table-elem">Password</label>
                    <label className="col-sm-3 user-table-elem" style={{textAlign:'center'}}>Action</label>
                </div>
                {users.map(user=>
                    <div className="row user-table-body" key={user.id}>
                        <label className="col-sm-1 user-table-elem">{user.id}</label>
                        <label className="col-sm-2 user-table-elem">{user.name}</label>
                        <label className="col-sm-2 user-table-elem">{user.userName}</label>
                        <label className="col-sm-2 user-table-elem">{user.roles}</label>
                        <label className="col-sm-2 user-table-elem">{user.passWord}</label>
                        <label className="col-sm-3 user-table-elem">
                            <label className="col-sm-6">
                                <button className="btn btn-outline-danger btn-sm user-table-btn" onClick={(event)=>onSetShowConfirmPopup(event,true,user.id)}>Delete</button>
                            </label>
                            <label className="col-sm-6">
                                <button className="btn btn-outline-primary btn-sm user-table-btn">Update</button>
                            </label>
                        </label>
                    </div>
                )}
            </div>
            <ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={deleteUser}
							selctdItem={selctdUser}
							headerTxt="Delete User"
							bodyTxt="Are you sure to delete this user ?"
                            msize="md"
							/>
        </div>
    );
}