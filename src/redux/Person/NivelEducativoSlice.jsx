import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    nivelEducativos: [],
    nivelEducativo: null,
    loading: false,
    error: null
};

const NivelEducativoSlice = createSlice({
    name: 'nivelEducativo',
    initialState,
    reducers: {
        setNivelEducativos (state, action) {
            state.nivelEducativos = action.payload
        },
        setNivelEducativo (state, action ) {
            state.nivelEducativo = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addNivelEducativo (state, action) {
            state.nivelEducativos = [ ...state.nivelEducativos, action.payload]
        },
        updateNivelEducativo (state, action) {
            const index = state.nivelEducativos.findIndex(nivelEducativo => nivelEducativo.id === action.payload.id)
            if (index !== -1) {
                state.nivelEducativos[index] = action.payload
            }
        },
        clearNivelEducativo(state) {
            state.nivelEducativo = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setNivelEducativos, setNivelEducativo, setLoading, addNivelEducativo, updateNivelEducativo, clearNivelEducativo, setError} = NivelEducativoSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerNivelEducativos = () => async dispatch  =>  {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }
    try {
        dispatch(setLoading(true));
        const { data } = await clienteAxios('/nivelEducativo', config);
        dispatch(setNivelEducativos(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Niveles Educativos"));
        dispatch(setLoading(false));
    }
}

export const guardarNivelEducativo = (nivelEducativo) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { nivelEducativo : nivelEducativoSeleccionado } = getState().nivelEducativo;
    try {
        if (nivelEducativoSeleccionado) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/nivelEducativo/${nivelEducativoSeleccionado.id}`, nivelEducativo, config);
            dispatch(updateNivelEducativo(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/nivelEducativo', nivelEducativo, config);
            dispatch(addNivelEducativo(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: nivelEducativoSeleccionado? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearNivelEducativo());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Nivel Educativo"));
        dispatch(setLoading(false));
    }
}

export const eliminarNivelEducativo = (id) => async (dispatch, getState) => {

    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }
    Swal.fire({
        title: "¿Desea eliminar el registro?",
        icon: "warning",
        position: "top",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                dispatch(setLoading(true));
                await clienteAxios.patch(`/nivelEducativo/${id}`, {estado: false}, config);
                const { nivelEducativos } = getState().nivelEducativo;
                dispatch(setNivelEducativos(nivelEducativos.filter(nivelEducativo => nivelEducativo.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Nivel Educativo"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default NivelEducativoSlice.reducer;