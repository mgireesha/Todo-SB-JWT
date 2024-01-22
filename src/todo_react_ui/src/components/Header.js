/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getAuth } from './utils/GlobalFuns';
import { useDispatch, useSelector} from 'react-redux';
import { APP_NAME_LABEL, LOGOUT, headerLinksLabels, orderedHeaderLinks } from './redux/todoActionTypes';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { setIsAuthenticated } from './redux/login/loginActions';
import { fetchCurrentUser, fetchHeaderLinks, setIsNabarExpanded } from './redux/common/commonActions';
export const Header = () => {
	const dispatch = useDispatch();
	const userListsKeys = useSelector(state => state.list.userListsKeys);
	const headerLinks = useSelector(state => state.common.headerLinks);
	const isNabarExpanded = useSelector(state => state.common.isNabarExpanded);
	const isAuthenticated = useSelector(state => state.login.isAuthenticated);
	const currentUser = useSelector(state => state.common.currentUser);

	
	useEffect(()=>{
		dispatch(setIsAuthenticated(getAuth()!==""?true:false));
	},[userListsKeys])

    useEffect(() => {
        if(isAuthenticated){
			dispatch(fetchHeaderLinks());
			dispatch(fetchCurrentUser());
		}
    }, [dispatch,isAuthenticated]);
	  
	return (
		<div className="row" id="todo-header" style={{height:'3.5em',marginBottom:'0.5em'}}>
			<Navbar  expand="md" style={{backgroundColor:'beige'}} expanded={isNabarExpanded}>  
				<Navbar.Brand href="#/todo" style={{marginLeft: 0.4+'em',width:40+'%', fontStyle:'italic', color:'#4491f5b8'}}>{APP_NAME_LABEL}</Navbar.Brand>  
				{isAuthenticated && 
							<>
								<NavDropdown title={`Hi ${currentUser.name}`} id="basic-nav-dropdown" className='ms-auto me-2' style={{color:'#4491f5b8'}}>
									{headerLinks && orderedHeaderLinks.map((linkKey,i)=>
										<>{linkKey!==LOGOUT && headerLinks[linkKey] && <NavDropdown.Item href={headerLinks[linkKey]} onClick={()=>dispatch(setIsNabarExpanded(!isNabarExpanded))}>{headerLinksLabels[linkKey]}</NavDropdown.Item>}</>
									)}
									<NavDropdown.Divider />  
									<NavDropdown.Item href="/#/logout">Logout</NavDropdown.Item>
								</NavDropdown> 
							</>
						}

				{/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>dispatch(setIsNabarExpanded(!isNabarExpanded))} />  
				<Navbar.Collapse id="basic-navbar-nav">  
					<Nav className="ms-auto me-3 pe-2">  
						
					</Nav>
				</Navbar.Collapse>   */}
  			</Navbar> 
		</div>
	);
}