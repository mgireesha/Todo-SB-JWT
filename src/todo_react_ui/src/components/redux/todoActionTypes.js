export const APP_NAME_LABEL = 'ToDo';

export const SUCCESS = 'SUCCESS';
export const LOADING = 'LOADING';

export const ACTION_ADD_ITEM = 'ACTION_ADD_ITEM';
export const ACTION_REMOVE_ITEM = 'ACTION_REMOVE_ITEM';
export const ACTION_MOVE_UP = 'ACTION_MOVE_UP';
export const ACTION_MOVE_DOWN = 'ACTION_MOVE_DOWN';

export const COMMON_POPUP_ERROR_MSG = 'COMMON_POPUP_ERROR_MSG';
export const COMMON_POPUP_PRIMARY_BTN = 'COMMON_POPUP_PRIMARY_BTN';
export const COMPONENT = 'COMPONENT';

export const EXPORT_LABEL = 'Export';
export const EXPORT_TODO_LISTS_LABEL = 'Export Todo lists';
export const EXPORT_TODO_LISTS_QUESTION_LABEL = 'Export all Todo lists ?';

export const HOME = 'HOME';

export const IMPORT_LABEL = 'Import';
export const INIT = 'INIT';
export const INPUT = 'INPUT';

export const IMPORT_OR_EXPORT = 'IMPORT_OR_EXPORT';
export const IMPORT_OR_EXPORT_LABEL = 'Import / Export';

export const LOGOUT = 'LOGOUT';

export const MANAGE_USERS = 'MANAGE_USERS';
export const MANAGE_USERS_LABEL = 'Manage users';
export const MY_ACCOUNT = 'MY_ACCOUNT';

export const NOT_YET_AVAIABLE_LABEL = 'Not yet available';

export const PASSWORD_AND_LOGIN = 'PASSWORD_AND_LOGIN';
export const PASSWORD_AND_LOGIN_LABEL = 'Passwords and Login';

export const TEXT = 'TEXT';

export const headerLinksLabels = {
    HOME:"Home",
    MY_ACCOUNT: "My Account",
    LOGOUT : "Logout",
    MANAGE_USERS : "Manage Users",
    IMPORT_EXPORT : "Import / Export",
    
}

export const myAccountLinksLabels = {
    PASSWORD_AND_LOGIN : PASSWORD_AND_LOGIN_LABEL,
    MANAGE_USERS : MANAGE_USERS_LABEL,
    IMPORT_OR_EXPORT : IMPORT_OR_EXPORT_LABEL,
    
}

export const orderedHeaderLinks = [HOME,MY_ACCOUNT,IMPORT_OR_EXPORT,MANAGE_USERS];

export const orderedMyAccountLinks = [PASSWORD_AND_LOGIN,IMPORT_OR_EXPORT,MANAGE_USERS]

//Password text mapping - start
export const PASSWORD_STRENGTH_MAPPING = {
    1 : {
        strength : 'Password is Weak.',
        color : 'red'
    },
    2 : {
        strength : 'Password is Good.',
        color : 'darkorange'
    },
    3 : {
        strength : 'Password is Good.',
        color : 'darkorange'
    },
    4 : {
        strength : 'Password is Strong.',
        color : 'darkgreen'
    },
    5 : {
        strength : 'Password is Very Strong.',
        color : 'green'
    }
}
//Password text mapping - end


export const EMAIL_FORMAT_REGEX = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);