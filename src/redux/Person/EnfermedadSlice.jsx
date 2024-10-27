import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    enfermedades: [],
    enfermedad: null,
    loading: false,
    error: null
};

const EnfermedadSlice = createSlice({
    name: 'Enfermedad',
    initialState,
    reducers: {
        setEnfermedades (state, action) {
            state.enfermedades = action.payload
        },
        setEnfermedad (state, action ) {
            state.enfermedad = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addEnfermedad (state, action) {
            state.enfermedades = [ ...state.enfermedades, action.payload]
        },
        updateEnfermedad (state, action) {
            const index = state.enfermedades.findIndex(enfermedad => enfermedad.id === action.payload.id)
            if (index !== -1) {
                state.enfermedades[index] = action.payload
            }
        },
        clearEnfermedad(state) {
            state.enfermedad = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setEnfermedades, setEnfermedad, setLoading, addEnfermedad, updateEnfermedad, clearEnfermedad, setError} = EnfermedadSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerEnfermedades = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/enfermedad', config);
        dispatch(setEnfermedades(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Enfermedades"));
        dispatch(setLoading(false));
    }
}

export const guardarEnfermedad = (enfermedad) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { enfermedad : enfermedadSeleccionada } = getState().enfermedad;
    try {
        if (enfermedadSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/enfermedad/${enfermedadSeleccionada.id}`, enfermedad, config);
            dispatch(updateEnfermedad(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/enfermedad', enfermedad, config);
            dispatch(addEnfermedad(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: enfermedadSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearEnfermedad());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Enfermedad"));
        dispatch(setLoading(false));
    }
}

export const eliminarEnfermedad = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/enfermedad/${id}`, {estado: false}, config);
                const { enfermedades } = getState().enfermedad;
                dispatch(setEnfermedades(enfermedades.filter(enfermedad => enfermedad.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Enfermedad"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default EnfermedadSlice.reducer;