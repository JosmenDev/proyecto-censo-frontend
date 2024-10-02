import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    cargoComunidades: [],
    cargoComunidad: null,
    loading: false,
    error: null
};

const CargoComunidadSlice = createSlice({
    name: 'cargoComunidad',
    initialState,
    reducers: {
        setCargoComunidades (state, action) {
            state.cargoComunidades = action.payload
        },
        setCargoComunidad (state, action ) {
            state.cargoComunidad = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addCargoComunidad (state, action) {
            state.cargoComunidades = [ ...state.cargoComunidades, action.payload]
        },
        updateCargoComunidad (state, action) {
            const index = state.cargoComunidades.findIndex(cargoComunidad => cargoComunidad.id === action.payload.id)
            if (index !== -1) {
                state.cargoComunidades[index] = action.payload
            }
        },
        clearCargoComunidad(state) {
            state.cargoComunidad = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setCargoComunidades, setCargoComunidad, setLoading, addCargoComunidad, updateCargoComunidad, clearCargoComunidad, setError} = CargoComunidadSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerCargoComunidades = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/cargoComunidad', config);
        dispatch(setCargoComunidades(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener cargos de comunidad"));
        dispatch(setLoading(false));
    }
}

export const guardarCargoComunidad = (cargoComunidad) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { cargoComunidad : cargoComunidadSeleccionada } = getState().cargoComunidad;
    try {
        if (cargoComunidadSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/cargoComunidad/${cargoComunidadSeleccionada.id}`, cargoComunidad, config);
            dispatch(updateCargoComunidad(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/cargoComunidad', cargoComunidad, config);
            dispatch(addCargoComunidad(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: cargoComunidadSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearCargoComunidad());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Cargo de Comunidad"));
        dispatch(setLoading(false));
    }
}

export const eliminarCargoComunidad = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/cargoComunidad/${id}`, {estado: false}, config);
                const { cargoComunidades } = getState().cargoComunidad;
                dispatch(setCargoComunidades(cargoComunidades.filter(cargoComunidad => cargoComunidad.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar cargo de comunidad"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default CargoComunidadSlice.reducer;