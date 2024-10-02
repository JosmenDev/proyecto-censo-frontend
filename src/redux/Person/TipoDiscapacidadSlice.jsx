import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    tipoDiscapacidades: [],
    tipoDiscapacidad: null,
    loading: false,
    error: null
};

const TipoDiscapacidadSlice = createSlice({
    name: 'tipoDiscapacidad',
    initialState,
    reducers: {
        setTipoDiscapacidades (state, action) {
            state.tipoDiscapacidades = action.payload
        },
        setTipoDiscapacidad (state, action ) {
            state.tipoDiscapacidad = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addTipoDiscapacidad (state, action) {
            state.tipoDiscapacidades = [ ...state.tipoDiscapacidades, action.payload]
        },
        updateTipoDiscapacidad (state, action) {
            const index = state.tipoDiscapacidades.findIndex(tipoDiscapacidad => tipoDiscapacidad.id === action.payload.id)
            if (index !== -1) {
                state.tipoDiscapacidades[index] = action.payload
            }
        },
        clearTipoDiscapacidad(state) {
            state.tipoDiscapacidad = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setTipoDiscapacidades, setTipoDiscapacidad, setLoading, addTipoDiscapacidad, updateTipoDiscapacidad, clearTipoDiscapacidad, setError} = TipoDiscapacidadSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerTipoDiscapacidades = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/tipoDiscapacidad', config);
        dispatch(setTipoDiscapacidades(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al Obtener tipos de discapacidad"));
        dispatch(setLoading(false));
    }
}

export const guardarTipoDiscapacidad = (tipoDiscapacidad) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { tipoDiscapacidad : tipoDiscapacidadSeleccionada } = getState().tipoDiscapacidad;
    try {
        if (tipoDiscapacidadSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/tipoDiscapacidad/${tipoDiscapacidadSeleccionada.id}`, tipoDiscapacidad, config);
            dispatch(updateTipoDiscapacidad(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/tipoDiscapacidad', tipoDiscapacidad, config);
            dispatch(addTipoDiscapacidad(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: tipoDiscapacidadSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearTipoDiscapacidad());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Tipo de Discapacidad"));
        dispatch(setLoading(false));
    }
}

export const eliminarTipoDiscapacidad = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/tipoDiscapacidad/${id}`, {estado: false}, config);
                const { tipoDiscapacidades } = getState().tipoDiscapacidad;
                dispatch(setTipoDiscapacidades(tipoDiscapacidades.filter(tipoDiscapacidad => tipoDiscapacidad.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Tipo de Discapacidad"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default TipoDiscapacidadSlice.reducer;