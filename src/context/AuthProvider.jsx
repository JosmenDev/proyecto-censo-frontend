import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";


const AuthContext = createContext();

const AuthProvider = ({children})  => {
    const [ auth, setAuth] = useState({});

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            try {
                const { data } = await clienteAxios('/auth/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
        };
        autenticarUsuario();
    },[]);

    return (
        <AuthContext.Provider
            value = {{
                auth,
                setAuth
            }}
        >
            {/* children: hijos o rutas del app.jsx */}
            {children}
        </AuthContext.Provider>
    )
} 

export {
    AuthProvider
};

export default AuthContext;