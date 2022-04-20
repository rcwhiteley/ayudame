import { createContext, useContext } from "react";
import { useAuthReducer, AuthActions } from "../reducers/AuthReducer";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [state, dispatch] = useAuthReducer()

    const login = (token) =>{
        console.log("login with token " + token)
        dispatch({action:AuthActions.LOGIN, payload:{token: token}})
    }
    const logout = () =>{
        console.log("logout")   
        dispatch({action:AuthActions.LOGOUT});
    }

    const authContextState = {
        login: login,
        logout: logout,
        ...state
    }

    return <AuthContext.Provider value={authContextState}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuthContext = ()=> useContext(AuthContext);