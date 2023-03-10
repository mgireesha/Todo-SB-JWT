import {React} from 'react';
import {MdArrowForwardIos} from 'react-icons/md';

export const TaskCompletedCounter = ({count,onToggleShowCmptdTsks,isShowCmptdTsks}) => {
	return (
		<div className="row" style={{margin:0,color: 'beige',marginLeft: 10}}>
						<label title='Click to expand / collapse' style={{width: 'auto',borderRadius: 4,backgroundColor: '#2E2729',paddingBottom: 2,cursor:'pointer'}}  onClick={onToggleShowCmptdTsks} >
							<span style={{fontStyle: 'italic'}}>Completed&nbsp;</span>
							<span className="tasks-cmptd-nbr" style={{marginLeft:10}}>{count}</span>
							{!isShowCmptdTsks && <MdArrowForwardIos style={{marginLeft:10,marginTop:-2}} />}
							{isShowCmptdTsks && <MdArrowForwardIos style={{transform:'rotate(90deg)',marginLeft:10,marginTop:-2}} />}
						</label>
					</div>
	);
}