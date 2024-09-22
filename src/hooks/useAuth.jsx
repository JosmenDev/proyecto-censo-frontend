// use context permite extraer los campos del context
import { useContext } from 'react'
// Context del cual quiero extraer los datos
import AuthContext from '../context/AuthProvider'


const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;