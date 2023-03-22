import { ACTION_ADD_ITEM, ACTION_MOVE_DOWN, ACTION_MOVE_UP, ACTION_REMOVE_ITEM } from "../redux/todoActionTypes";

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthsI = ['01','02','03','04','05','06','07','08','09','10','11','12'];

export function getAuth() {
    let cookies = document.cookie;
    let cookiesArr = cookies.split(';');
    let cookieArr = [];
    let jToken = '';
    cookiesArr.forEach(cookie => {
        cookieArr = cookie.split('=');
        if (cookieArr[0].trim() === "jToken") {
            jToken = cookieArr[1];
        }
    });
    return jToken;
}

export const dueDateColor = (date) => {
    if(date===null){
        return '';
    }
    var iDate = new Date(date);
    var today = new Date();
    if(iDate.getFullYear()<=today.getFullYear()){
        if(iDate.getFullYear()<today.getFullYear()){
            return '#b50c0c';
        }else{
            if(iDate.getMonth()<=today.getMonth()){
                if(iDate.getMonth()<today.getMonth()){
                    return '#b50c0c';
                }else{
                    if(iDate.getDate()<=today.getDate()){
                        if(iDate.getDate()===today.getDate()){
                            return '#577db5';
                        }else if(iDate.getDate()<today.getDate()){
                            return '#b50c0c';
                        }
                    }else{
                        return '';
                    }
                }
            }else{
                return '';
            }
        }
    }else{
        return '';
    }
}

export function convertDateT(date) {
    var cDate = "";
    var d = new Date(date);
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
        cDate = "Today";
    } else if (d.getFullYear() === tomorrow.getFullYear() && d.getMonth() === tomorrow.getMonth() && d.getDate() === tomorrow.getDate()) {
        cDate = "Tomorow";
    } else {
        cDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
    }
    return cDate;
}

export function disableDiv() {
    // document.getElementById('disable-div').style.width
    //     = document.getElementById('app-main-div').offsetWidth + 'px';
    // document.getElementById('disable-div').style.height
    //     //= document.getElementById('app-main-div').offsetHeight+'px';
    //     = window.innerHeight + 30 + 'px';
    // document.getElementById('disable-div').style.top = '-30px';
    document.getElementById('disable-div').style.display = 'block';
}
export function enableDiv() {
    document.getElementById('disable-div').style.display = 'none';
}

export function handleAPIError(error){
    console.log(error);
    if(error.response!==undefined){
        if(error.response.data.status==="TOKEN_EXPIRED"){
            document.cookie="jToken=;";
            window.location.reload();
        }
    }
}


export function getServiceURI(){
    //return "http://localhost:8087";//COMMENT THIS BEFORE COMMITTING
    return "";
} 

export const isMobile = () => {
        return ( ( window.innerWidth <= 760 ) 
        //&& ( window.innerHeight <= 600 ) 
        );
      }

export const getDateFormat = (inpDate) => {
    if(inpDate===null || inpDate===undefined)return null;
    const date = new Date(inpDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const datetime = ("0" + (date.getHours())).slice(-2) + ":" + ("0" + (date.getMinutes())).slice(-2)// + ":" + date.getSeconds();
    return [date.getFullYear(),month,day].join('-')+'T'+datetime;
}

export const getChangedListOrder = (list, listOrder, action) => {
    let tempListOrder = listOrder;
    let tempListOrderArr = tempListOrder.split(",");
    tempListOrderArr = tempListOrderArr.filter(listId => {return listId!==''})
    const currntIndex = tempListOrderArr.indexOf(list.listId.toString());
    if(currntIndex!==-1)tempListOrderArr.splice(currntIndex,1);
    switch (action) {
        case ACTION_MOVE_UP:
            tempListOrderArr.splice(currntIndex-1,0,list.listId.toString());
            break;
        case ACTION_MOVE_DOWN:
            tempListOrderArr.splice(currntIndex+1,0,list.listId.toString());
            break;
        case ACTION_ADD_ITEM:
            tempListOrderArr.push(list.listId.toString());
            break;
        case ACTION_REMOVE_ITEM:
            tempListOrderArr = tempListOrderArr.filter((loi => {return loi !==list.listId}));
            break;
        default:
            break;
    }
    return tempListOrderArr; 
}

export const createListOrderFromList = (lists) => {
    let listOrder = "";
	lists.forEach(list => {
	    listOrder += list.listId + ",";
	});
    return listOrder;
}

export const createFilteredListOrderFromArry = (listOrderArr, lists) => {
    let listOrder = "";
    if(lists!==undefined){
        listOrderArr.forEach(listId => {
			if(lists.find(list => {return list.listId === parseInt(listId)})!==undefined){
				listOrder += listId + ",";
			}
		});
    }else{
        listOrderArr.forEach(listId => {listOrder += listId + ",";});
    }
    return listOrder;
}

export const syncListOrderArr = (listOrderArr, lists) => {
    let tempListOrderArr = listOrderArr;
    listOrderArr.forEach(listId => {
        if(lists.find(list => {return list.listId === parseInt(listId)})===undefined){
            tempListOrderArr = tempListOrderArr.filter(tlistId => {return tlistId!==listId});
        } 
    });
    lists.forEach(list => {
        if(!tempListOrderArr.includes(list.listId.toString())){
            tempListOrderArr.push(list.listId.toString());
        }
    });

    return tempListOrderArr;
}