import {React} from 'react';

export const AddListFiled =({onAddList}) => {
	
	return(
		
		<div className=" list-item-add-field" id="list-item-add-field">
			<div className="row margin-zero">
				<div className="col-sm-10 padding-zero" style={{paddingLeft:2,paddingRight:2}}>
					<input type="text" id="list-add-txt" className="form-control list-add-txt" placeholder="List Name" style={{ backgroundColor: 'darkkhaki'}} required />
				</div>
				<div className="col-sm-2 padding-zero" style={{paddingLeft:2,paddingRight:2}}>
					<button className="list-add-button" onClick={onAddList}>Add</button>
				</div>
			</div>
		</div>
		
		
		
	);
}