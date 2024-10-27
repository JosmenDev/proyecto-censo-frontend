import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    cloraciones: [],
    cloracion: null,
    loading: false,
    error: null
};

const CloracionSlice = createSlice({
    name: 'cloracion',
    initialState,
    reducers: {
        setCloraciones (state, action) {
            state.cloraciones = action.payload
        },
        setCloracion (state, action ) {
            state.cloracion = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addCloracion (state, action) {
            state.cloraciones = [ ...state.cloraciones, action.payload]
        },
        updateCloracion (state, action) {
            const index = state.cloraciones.findIndex(cloracion => cloracion.id === action.payload.id)
            if (index !== -1) {
                state.cloraciones[index] = action.payload
            }
        },
        clearCloracion(state) {
            state.cloracion = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setCloraciones, setCloracion, setLoading, addCloracion, updateCloracion, clearCloracion, setError} = CloracionSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerCloraciones = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/cloracion', config);
        dispatch(setCloraciones(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Cloraciones"));
        dispatch(setLoading(false));
    }
}

export const guardarCloracion = (cloracion) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { cloracion : cloracionSeleccionada } = getState().cloracion;
    try {
        if (cloracionSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/cloracion/${cloracionSeleccionada.id}`, cloracion, config);
            dispatch(updateCloracion(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/cloracion', cloracion, config);
            dispatch(addCloracion(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: cloracionSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearCloracion());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Cloración"));
        dispatch(setLoading(false));
    }
}

export const eliminarCloracion = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/cloracion/${id}`, {estado: false}, config);
                const { cloraciones } = getState().cloracion;
                dispatch(setCloraciones(cloraciones.filter(cloracion => cloracion.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Cloración"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
}

export default CloracionSlice.reducer;