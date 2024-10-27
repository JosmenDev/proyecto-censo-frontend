import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    medidaProtecciones: [],
    medidaProteccion: null,
    loading: false,
    error: null
};

const MedidaProteccionSlice = createSlice({
    name: 'medidaProteccion',
    initialState,
    reducers: {
        setMedidaProtecciones (state, action) {
            state.medidaProtecciones = action.payload
        },
        setMedidaProteccion (state, action ) {
            state.medidaProteccion = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addMedidaProteccion (state, action) {
            state.medidaProtecciones = [ ...state.medidaProtecciones, action.payload]
        },
        updateMedidaProteccion (state, action) {
            const index = state.medidaProtecciones.findIndex(medidaProteccion => medidaProteccion.id === action.payload.id)
            if (index !== -1) {
                state.medidaProtecciones[index] = action.payload
            }
        },
        clearMedidaProteccion(state) {
            state.medidaProteccion = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setMedidaProtecciones, setMedidaProteccion, setLoading, addMedidaProteccion, updateMedidaProteccion, clearMedidaProteccion, setError} = MedidaProteccionSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerMedidaProtecciones = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/medidaProteccion', config);
        dispatch(setMedidaProtecciones(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al Obtener Medidas de Protección"));
        dispatch(setLoading(false));
    }
}

export const guardarMedidaProteccion = (medidaProteccion) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { medidaProteccion : medidaProteccionSeleccionada } = getState().medidaProteccion;
    try {
        if (medidaProteccionSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/medidaProteccion/${medidaProteccionSeleccionada.id}`, medidaProteccion, config);
            dispatch(updateMedidaProteccion(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/medidaProteccion', medidaProteccion, config);
            dispatch(addMedidaProteccion(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: medidaProteccionSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearMedidaProteccion());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Medidas de Protección"));
        dispatch(setLoading(false));
    }
}

export const eliminarMedidaProteccion = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/medidaProteccion/${id}`, {estado: false}, config);
                const { medidaProtecciones } = getState().medidaProteccion;
                dispatch(setMedidaProtecciones(medidaProtecciones.filter(medidaProteccion => medidaProteccion.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Medidas de Protección"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
}

export default MedidaProteccionSlice.reducer;