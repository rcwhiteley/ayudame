import { useReducer } from "react";

const authInitialState = {
    token: null,
    isLoading: false,
    userAction: '',
}

const AuthActions = {
    LOGIN: 'login',
    LOGOUT: 'logout',
}

const AuthReducer = (prevState, { action, payload }) => {
    switch (action) {
        case AuthActions.LOGIN:
            return {
                ...prevState,
                token: payload.token,
                userAction: AuthActions.LOGIN,
                isLoading: false,
            }
            break;
        case AuthActions.LOGOUT:
            return {
                ...prevState,
                token: null,
                userAction: AuthActions.LOGOUT,
                isLoading: false
            }
        default:
            throw new Error(`Reducer for action ${action} not found`);
    }
}

const useAuthReducer = ()=>{
    return useReducer(AuthReducer, authInitialState)
}

export {useAuthReducer, AuthActions};