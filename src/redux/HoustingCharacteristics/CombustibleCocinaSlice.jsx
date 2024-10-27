import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    combustibleCocinas: [],
    combustibleCocina: null,
    loading: false,
    error: null
};

const CombustibleCocinaSlice = createSlice({
    name: 'combustibleCocina',
    initialState,
    reducers: {
        setCombustibleCocinas (state, action) {
            state.combustibleCocinas = action.payload
        },
        setCombustibleCocina (state, action ) {
            state.combustibleCocina = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addCombustibleCocina (state, action) {
            state.combustibleCocinas = [ ...state.combustibleCocinas, action.payload]
        },
        updateCombustibleCocina (state, action) {
            const index = state.combustibleCocinas.findIndex(combustibleCocina => combustibleCocina.id === action.payload.id)
            if (index !== -1) {
                state.combustibleCocinas[index] = action.payload
            }
        },
        clearCombustibleCocina(state) {
            state.combustibleCocina = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setCombustibleCocinas, setCombustibleCocina, setLoading, addCombustibleCocina, updateCombustibleCocina, clearCombustibleCocina, setError} = CombustibleCocinaSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerCombustibleCocinas = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/combustibleCocina', config);
        dispatch(setCombustibleCocinas(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Combustibles de Cocina"));
        dispatch(setLoading(false));
    }
}

export const guardarCombustibleCocina = (combustibleCocina) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { combustibleCocina : combustibleCocinaSeleccionada } = getState().combustibleCocina;
    try {
        if (combustibleCocinaSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/combustibleCocina/${combustibleCocinaSeleccionada.id}`, combustibleCocina, config);
            dispatch(updateCombustibleCocina(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/combustibleCocina', combustibleCocina, config);
            dispatch(addCombustibleCocina(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: combustibleCocinaSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearCombustibleCocina());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Combustible de Cocina"));
        dispatch(setLoading(false));
    }
}

export const eliminarCombustibleCocina = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/combustibleCocina/${id}`, {estado: false}, config);
                const { combustibleCocinas } = getState().combustibleCocina;
                dispatch(setCombustibleCocinas(combustibleCocinas.filter(combustibleCocina => combustibleCocina.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Combustible de Cocina"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default CombustibleCocinaSlice.reducer;