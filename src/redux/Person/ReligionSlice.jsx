import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    religiones: [],
    religion: null,
    loading: false,
    error: null
};

const ReligionSlice = createSlice({
    name: 'religion',
    initialState,
    reducers: {
        setReligiones (state, action) {
            state.religiones = action.payload
        },
        setReligion (state, action ) {
            state.religion = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addReligion (state, action) {
            state.religiones = [ ...state.religiones, action.payload]
        },
        updateReligion (state, action) {
            const index = state.religiones.findIndex(religion => religion.id === action.payload.id)
            if (index !== -1) {
                state.religiones[index] = action.payload
            }
        },
        clearReligion(state) {
            state.religion = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setReligiones, setReligion, setLoading, addReligion, updateReligion, clearReligion, setError} = ReligionSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerReligiones = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/religion', config);
        console.log(data);
        dispatch(setReligiones(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Religiones"));
        dispatch(setLoading(false));
    }
}

export const guardarReligion = (religion) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { religion : religionSeleccionada } = getState().religion;
    try {
        if (religionSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/religion/${religionSeleccionada.id}`, religion, config);
            dispatch(updateReligion(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/religion', religion, config);
            dispatch(addReligion(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: religionSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearReligion());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Religión"));
        dispatch(setLoading(false));
    }
}

export const eliminarReligion = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/religion/${id}`, {estado: false}, config);
                const { religiones } = getState().religion;
                dispatch(setReligiones(religiones.filter(religion => religion.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Religión"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default ReligionSlice.reducer;