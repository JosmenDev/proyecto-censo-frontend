import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clienteAxios from "../../config/axios";

const initialState = {
    mediosInformacion: [],
    medioInformacion: null,
    loading: false,
    error: null
};

const MedioInformacionSlice = createSlice( {
    name: 'medioInformacion',
    initialState,
    reducers: {
        setMediosInformacion (state, action) {
            state.mediosInformacion = action.payload
        },
        setMedioInformacion (state, action) {
            state.medioInformacion = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addMedioInformacion (state, action) {
            state.mediosInformacion = [ ...state.mediosInformacion, action.payload]
        },
        updateMedioInformacion (state, action) {
            const index = state.mediosInformacion.findIndex(medioInformacion => medioInformacion.id == action.payload.id);
            if (index !== -1) {
                state.mediosInformacion[index] = action.payload;
            }
            
        },
        clearMedioInformacion (state) {
            state.medioInformacion = null;
        },
        setError (state, action) {
            state.error = action.payload;
        }
    }
});

export const { setMediosInformacion, setMedioInformacion, setLoading, addMedioInformacion, updateMedioInformacion, clearMedioInformacion, setError } = MedioInformacionSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerMediosInformacion = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }
    try {
        dispatch(setLoading(true));
        const { data } = await clienteAxios('/medioInformacion', config);
        dispatch(setMediosInformacion(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || 'Error al obtener medios de información'));
        dispatch(setLoading(false));
    }
}

export const guardarMedioInformacion = (medioInformacion) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if(!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }
    
    const { medioInformacion: medioInformacionSeleccionado } = getState().medioInformacion;
    try {
        if (medioInformacionSeleccionado) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/medioInformacion/${medioInformacionSeleccionado.id}`, medioInformacion, config);
            dispatch(updateMedioInformacion(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/medioInformacion', medioInformacion, config);
            dispatch(addMedioInformacion(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: medioInformacionSeleccionado? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearMedioInformacion());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar medio de información"));
        dispatch(setLoading(false));
    }
}

export const eliminarMedioInformacion = (id) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if(!token) return;
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
                await clienteAxios.patch(`/medioInformacion/${id}`, {estado: false} , config);
                const { mediosInformacion } = getState().medioInformacion;
                dispatch(setMediosInformacion(mediosInformacion.filter( medioInformacion => medioInformacion.id !== id)));
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Medio de Información"));
                dispatch(setLoading(false));
            } 
        }
    }); 
}

export default MedioInformacionSlice.reducer;