import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    abastecimientoAguas: [],
    abastecimientoAgua: null,
    loading: false,
    error: null
};

const AbastecimientoAguaSlice = createSlice({
    name: 'abastecimientoAgua',
    initialState,
    reducers: {
        setAbastecimientoAguas (state, action) {
            state.abastecimientoAguas = action.payload
        },
        setAbastecimientoAgua (state, action ) {
            state.abastecimientoAgua = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addAbastecimientoAgua (state, action) {
            state.abastecimientoAguas = [ ...state.abastecimientoAguas, action.payload]
        },
        updateAbastecimientoAgua (state, action) {
            const index = state.abastecimientoAguas.findIndex(abastecimientoAgua => abastecimientoAgua.id === action.payload.id)
            if (index !== -1) {
                state.abastecimientoAguas[index] = action.payload
            }
        },
        clearAbastecimientoAgua(state) {
            state.abastecimientoAgua = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setAbastecimientoAguas, setAbastecimientoAgua, setLoading, addAbastecimientoAgua, updateAbastecimientoAgua, clearAbastecimientoAgua, setError} = AbastecimientoAguaSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerAbastecimientoAguas = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/abastecimientoAgua', config);
        dispatch(setAbastecimientoAguas(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Abastecimientos de Agua"));
        dispatch(setLoading(false));
    }
}

export const guardarAbastecimientoAgua = (abastecimientoAgua) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { abastecimientoAgua : abastecimientoAguaSeleccionada } = getState().abastecimientoAgua;
    try {
        if (abastecimientoAguaSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/abastecimientoAgua/${abastecimientoAguaSeleccionada.id}`, abastecimientoAgua, config);
            dispatch(updateAbastecimientoAgua(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/abastecimientoAgua', abastecimientoAgua, config);
            dispatch(addAbastecimientoAgua(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: abastecimientoAguaSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearAbastecimientoAgua());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Abastecimiento de Agua"));
        dispatch(setLoading(false));
    }
}

export const eliminarAbastecimientoAgua = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/abastecimientoAgua/${id}`, {estado: false}, config);
                const { abastecimientoAguas } = getState().abastecimientoAgua;
                dispatch(setAbastecimientoAguas(abastecimientoAguas.filter(abastecimientoAgua => abastecimientoAgua.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Abastecimiento de Agua"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default AbastecimientoAguaSlice.reducer;