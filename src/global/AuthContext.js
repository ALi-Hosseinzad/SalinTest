import { createContext, useState } from "react";
import cookie from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const userAuth = !!cookie.get('token');
    const [auth, setAuth] = useState(userAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;