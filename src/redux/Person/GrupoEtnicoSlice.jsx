import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    grupoEtnicos: [],
    grupoEtnico: null,
    loading: false,
    error: null
};

const GrupoEtnicoSlice = createSlice({
    name: 'grupoEtnico',
    initialState,
    reducers: {
        setGrupoEtnicos (state, action) {
            state.grupoEtnicos = action.payload
        },
        setGrupoEtnico (state, action ) {
            state.grupoEtnico = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addGrupoEtnico (state, action) {
            state.grupoEtnicos = [ ...state.grupoEtnicos, action.payload]
        },
        updateGrupoEtnico (state, action) {
            const index = state.grupoEtnicos.findIndex(grupoEtnico => grupoEtnico.id === action.payload.id)
            if (index !== -1) {
                state.grupoEtnicos[index] = action.payload
            }
        },
        clearGrupoEtnico(state) {
            state.grupoEtnico = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setGrupoEtnicos, setGrupoEtnico, setLoading, addGrupoEtnico, updateGrupoEtnico, clearGrupoEtnico, setError} = GrupoEtnicoSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerGrupoEtnicos = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/grupoEtnico', config);
        dispatch(setGrupoEtnicos(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Grupos Étnicos"));
        dispatch(setLoading(false));
    }
}

export const guardarGrupoEtnico = (grupoEtnico) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { grupoEtnico : grupoEtnicoSeleccionado } = getState().grupoEtnico;
    try {
        if (grupoEtnicoSeleccionado) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/grupoEtnico/${grupoEtnicoSeleccionado.id}`, grupoEtnico, config);
            dispatch(updateGrupoEtnico(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/grupoEtnico', grupoEtnico, config);
            dispatch(addGrupoEtnico(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: grupoEtnicoSeleccionado? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearGrupoEtnico());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Grupo Étnico"));
        dispatch(setLoading(false));
    }
}

export const eliminarGrupoEtnico = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/grupoEtnico/${id}`, {estado: false}, config);
                const { grupoEtnicos } = getState().grupoEtnico;
                dispatch(setGrupoEtnicos(grupoEtnicos.filter(grupoEtnico => grupoEtnico.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Grupo Étnico"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default GrupoEtnicoSlice.reducer;