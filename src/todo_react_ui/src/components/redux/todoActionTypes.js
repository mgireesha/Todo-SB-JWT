export const APP_NAME_LABEL = 'ToDo';

export const SUCCESS = 'SUCCESS';
export const LOADING = 'LOADING';

export const ACTION_ADD_ITEM = 'ACTION_ADD_ITEM';
export const ACTION_REMOVE_ITEM = 'ACTION_REMOVE_ITEM';
export const ACTION_MOVE_UP = 'ACTION_MOVE_UP';
export const ACTION_MOVE_DOWN = 'ACTION_MOVE_DOWN';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_LABEL = 'Change Password';
export const COMMON_POPUP_ERROR_MSG = 'COMMON_POPUP_ERROR_MSG';
export const COMMON_POPUP_PRIMARY_BTN = 'COMMON_POPUP_PRIMARY_BTN';
export const COMPONENT = 'COMPONENT';

export const DEVELOPMENT = 'DEVELOPMENT';

export const EXPORT_LABEL = 'Export';
export const EXPORT_TODO_LISTS_LABEL = 'Export Todo lists';
export const EXPORT_TODO_LISTS_QUESTION_LABEL = 'Export all Todo lists ?';
export const ERR_NETWORK = 'ERR_NETWORK';
export const ERROR = 'ERROR';
export const ERROR_CODE = 'ERROR_CODE';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';

export const FAILED = 'FAILED';

export const HOME = 'HOME';

export const IMPORT_LABEL = 'Import';
export const INIT = 'INIT';
export const INPUT = 'INPUT';
export const INVALID_URL = 'INVALID_URL';

export const IMPORT_OR_EXPORT = 'IMPORT_OR_EXPORT';
export const IMPORT_OR_EXPORT_LABEL = 'Import / Export';

export const LOGOUT = 'LOGOUT';
export const L_SUCCESS = 'L_SUCCESS';

export const MANAGE_USERS = 'MANAGE_USERS';
export const MANAGE_USERS_LABEL = 'Manage users';
export const MY_ACCOUNT = 'MY_ACCOUNT';

export const NOT_YET_AVAIABLE_LABEL = 'Not yet available';

export const PASSWORD_AND_LOGIN = 'PASSWORD_AND_LOGIN';
export const PASSWORD_AND_LOGIN_LABEL = 'Passwords and Login';

export const _ERR_SAME_CURRENT_AND_NEW_PASSWORDS = '_ERR_SAME_CURRENT_AND_NEW_PASSWORDS';
export const _ERR_USER_NOT_FOUND = '_ERR_USER_NOT_FOUND';
export const _ERR_UNKNOWN_EXCEPTION = '_ERR_UNKNOWN_EXCEPTION';
export const _ERR_WRONG_CURRENT_PASSWORD = '_ERR_WRONG_CURRENT_PASSWORD';
export const _ERR_USER_EXISTS = '_ERR_USER_EXISTS';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_OTP = 'RESET_PASSWORD_OTP';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_LABEL = 'sign in';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_LABEL = 'Sign Up';

export const TEXT = 'TEXT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

export const USER_AVAILABLE= 'USER_AVAILABLE';
export const USERNAME_AVAILABLE= 'USERNAME_AVAILABLE';
export const USERNAME_NOT_AVAILABLE= 'USERNAME_NOT_AVAILABLE';

export const headerLinksLabels = {
    HOME:"Home",
    MY_ACCOUNT: "My Account",
    LOGOUT : "Logout",
    MANAGE_USERS : "Manage Users",
    IMPORT_EXPORT : "Import / Export",
    
}

export const myAccountLinksLabels = {
    PASSWORD_AND_LOGIN : CHANGE_PASSWORD_LABEL,
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