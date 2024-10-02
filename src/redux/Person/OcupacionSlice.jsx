import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    ocupaciones: [],
    ocupacion: null,
    loading: false,
    error: null
};

const OcupacionSlice = createSlice({
    name: 'ocupacion',
    initialState,
    reducers: {
        setOcupaciones (state, action) {
            state.ocupaciones = action.payload
        },
        setOcupacion (state, action ) {
            state.ocupacion = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addOcupacion (state, action) {
            state.ocupaciones = [ ...state.ocupaciones, action.payload]
        },
        updateOcupacion (state, action) {
            const index = state.ocupaciones.findIndex(cargo => cargo.id === action.payload.id)
            if (index !== -1) {
                state.ocupaciones[index] = action.payload
            }
        },
        clearOcupacion(state) {
            state.ocupacion = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setOcupaciones, setOcupacion, setLoading, addOcupacion, updateOcupacion, clearOcupacion, setError} = OcupacionSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerOcupaciones = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/ocupacion', config);
        console.log(data);
        dispatch(setOcupaciones(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener cargos"));
        dispatch(setLoading(false));
    }
}

export const guardarOcupacion = (ocupacion) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { ocupacion : ocupacionSeleccionada } = getState().ocupacion;
    try {
        if (ocupacionSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/ocupacion/${ocupacionSeleccionada.id}`, ocupacion, config);
            dispatch(updateOcupacion(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/ocupacion', ocupacion, config);
            dispatch(addOcupacion(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: ocupacionSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearOcupacion());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener cargos"));
        dispatch(setLoading(false));
    }
}

export const eliminarOcupacion = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/ocupacion/${id}`, {estado: false}, config);
                const { ocupaciones } = getState().ocupacion;
                dispatch(setOcupaciones(ocupaciones.filter(ocupacion => ocupacion.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar ocupación"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default OcupacionSlice.reducer;