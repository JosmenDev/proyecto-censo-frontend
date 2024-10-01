import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../../config/axios';

const initialState = {
    auth: {},
    cargando: true,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload;
        },
        setCargando(state, action) {
            state.cargando = action.payload;
        },
        cerrarSesion(state) {
            localStorage.removeItem('token');
            state.auth = {};
        },
    },
});

export const { setAuth, setCargando, cerrarSesion } = AuthSlice.actions;

export const autenticarUsuario = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(setCargando(false));
        return;
    }
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await clienteAxios('/auth/perfil', config);
        dispatch(setAuth(data));
    } catch (error) {
        console.log(error.response?.data?.msg || "Error al autenticar");
        dispatch(setAuth({}));
    }

    dispatch(setCargando(false));
};

export default AuthSlice.reducer;
