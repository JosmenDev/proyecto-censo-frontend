import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    segurosSalud: [],
    seguroSalud: null,
    loading: false,
    error: null
};

const SeguroSaludSlice = createSlice({
    name: 'seguroSalud',
    initialState,
    reducers: {
        setSegurosSalud (state, action) {
            state.segurosSalud = action.payload
        },
        setSeguroSalud (state, action ) {
            state.seguroSalud = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addSeguroSalud (state, action) {
            state.segurosSalud = [ ...state.segurosSalud, action.payload]
        },
        updateSeguroSalud (state, action) {
            const index = state.segurosSalud.findIndex(seguroSalud => seguroSalud.id === action.payload.id)
            if (index !== -1) {
                state.segurosSalud[index] = action.payload
            }
        },
        clearSeguroSalud(state) {
            state.seguroSalud = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setSegurosSalud, setSeguroSalud, setLoading, addSeguroSalud, updateSeguroSalud, clearSeguroSalud, setError} = SeguroSaludSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerSegurosSalud = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/seguroSalud', config);
        dispatch(setSegurosSalud(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al Obtener Seguros de Salud"));
        dispatch(setLoading(false));
    }
}

export const guardarSeguroSalud = (seguroSalud) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { seguroSalud : seguroSaludSeleccionada } = getState().seguroSalud;
    try {
        if (seguroSaludSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/seguroSalud/${seguroSaludSeleccionada.id}`, seguroSalud, config);
            dispatch(updateSeguroSalud(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/seguroSalud', seguroSalud, config);
            dispatch(addSeguroSalud(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: seguroSaludSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearSeguroSalud());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Seguro de Salud"));
        dispatch(setLoading(false));
    }
}

export const eliminarSeguroSalud = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/seguroSalud/${id}`, {estado: false}, config);
                const { segurosSalud } = getState().seguroSalud;
                dispatch(setSegurosSalud(segurosSalud.filter(seguroSalud => seguroSalud.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Seguro de Salud"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default SeguroSaludSlice.reducer;