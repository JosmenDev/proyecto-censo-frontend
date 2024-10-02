import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    accionEmergencias: [],
    accionEmergencia: null,
    loading: false,
    error: null
};

const AccionEmergenciaSlice = createSlice({
    name: 'accionEmergencia',
    initialState,
    reducers: {
        setAccionEmergencias (state, action) {
            state.accionEmergencias = action.payload
        },
        setAccionEmergencia (state, action ) {
            state.accionEmergencia = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addAccionEmergencia (state, action) {
            state.accionEmergencias = [ ...state.accionEmergencias, action.payload]
        },
        updateAccionEmergencia (state, action) {
            const index = state.accionEmergencias.findIndex(accionEmergencia => accionEmergencia.id === action.payload.id)
            if (index !== -1) {
                state.accionEmergencias[index] = action.payload
            }
        },
        clearAccionEmergencia(state) {
            state.accionEmergencia = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setAccionEmergencias, setAccionEmergencia, setLoading, addAccionEmergencia, updateAccionEmergencia, clearAccionEmergencia, setError} = AccionEmergenciaSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerAccionEmergencias = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/accionEmergencia', config);
        dispatch(setAccionEmergencias(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener acciones de emergencia"));
        dispatch(setLoading(false));
    }
}

export const guardarAccionEmergencia = (accionEmergencia) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { accionEmergencia : accionEmergenciaSeleccionada } = getState().accionEmergencia;
    try {
        if (accionEmergenciaSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/accionEmergencia/${accionEmergenciaSeleccionada.id}`, accionEmergencia, config);
            dispatch(updateAccionEmergencia(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/accionEmergencia', accionEmergencia, config);
            dispatch(addAccionEmergencia(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: accionEmergenciaSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearAccionEmergencia());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Acción de Emergencia"));
        dispatch(setLoading(false));
    }
}

export const eliminarAccionEmergencia = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/accionEmergencia/${id}`, {estado: false}, config);
                const { accionEmergencias } = getState().accionEmergencia;
                dispatch(setAccionEmergencias(accionEmergencias.filter(accionEmergencia => accionEmergencia.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Acción de Emergencia"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default AccionEmergenciaSlice.reducer;