import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";


const AuthContext = createContext();

const AuthProvider = ({children})  => {
    const [ auth, setAuth] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            console.log('Validando token');
            if(!token) {
                console.log('Token no valido')
                setCargando(false);
                return;
            };
            console.log('Token valido')
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            try {
                const { data } = await clienteAxios('/auth/perfil', config);
                console.log('Perfil Realizado');
                setAuth(data);
                console.log(auth);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);
        };
        autenticarUsuario();
    },[]);

    return (
        <AuthContext.Provider
            value = {{
                auth,
                setAuth,
                cargando
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