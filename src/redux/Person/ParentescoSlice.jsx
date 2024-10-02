import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    parentescos: [],
    parentesco: null,
    loading: false,
    error: null
};

const ParentescoSlice = createSlice({
    name: 'parentesco',
    initialState,
    reducers: {
        setParentescos (state, action) {
            state.parentescos = action.payload
        },
        setParentesco (state, action ) {
            state.parentesco = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addParentesco (state, action) {
            state.parentescos = [ ...state.parentescos, action.payload]
        },
        updateParentesco (state, action) {
            const index = state.parentescos.findIndex(parentesco => parentesco.id === action.payload.id)
            if (index !== -1) {
                state.parentescos[index] = action.payload
            }
        },
        clearParentesco(state) {
            state.parentesco = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setParentescos, setParentesco, setLoading, addParentesco, updateParentesco, clearParentesco, setError} = ParentescoSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerParentescos = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/parentesco', config);
        dispatch(setParentescos(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener parentescos"));
        dispatch(setLoading(false));
    }
}

export const guardarParentesco = (parentesco) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { parentesco : parentescoSeleccionada } = getState().parentesco;
    try {
        if (parentescoSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/parentesco/${parentescoSeleccionada.id}`, parentesco, config);
            dispatch(updateParentesco(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/parentesco', parentesco, config);
            dispatch(addParentesco(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: parentescoSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearParentesco());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Parentesco"));
        dispatch(setLoading(false));
    }
}

export const eliminarParentesco = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/parentesco/${id}`, {estado: false}, config);
                const { parentescos } = getState().parentesco;
                dispatch(setParentescos(parentescos.filter(parentesco => parentesco.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Parentesco"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default ParentescoSlice.reducer;