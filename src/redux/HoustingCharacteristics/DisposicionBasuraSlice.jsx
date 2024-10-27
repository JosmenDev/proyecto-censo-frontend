import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    disposicionBasuras: [],
    disposicionBasura: null,
    loading: false,
    error: null
};

const DisposicionBasuraSlice = createSlice({
    name: 'disposicionBasura',
    initialState,
    reducers: {
        setDisposicionBasuras (state, action) {
            state.disposicionBasuras = action.payload
        },
        setDisposicionBasura (state, action ) {
            state.disposicionBasura = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addDisposicionBasura (state, action) {
            state.disposicionBasuras = [ ...state.disposicionBasuras, action.payload]
        },
        updateDisposicionBasura (state, action) {
            const index = state.disposicionBasuras.findIndex(disposicionBasura => disposicionBasura.id === action.payload.id)
            if (index !== -1) {
                state.disposicionBasuras[index] = action.payload
            }
        },
        clearDisposicionBasura(state) {
            state.disposicionBasura = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setDisposicionBasuras, setDisposicionBasura, setLoading, addDisposicionBasura, updateDisposicionBasura, clearDisposicionBasura, setError} = DisposicionBasuraSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerDisposicionBasuras = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/disposicionBasura', config);
        dispatch(setDisposicionBasuras(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Disposiciones de basura"));
        dispatch(setLoading(false));
    }
}

export const guardarDisposicionBasura = (disposicionBasura) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { disposicionBasura : disposicionBasuraSeleccionada } = getState().disposicionBasura;
    try {
        if (disposicionBasuraSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/disposicionBasura/${disposicionBasuraSeleccionada.id}`, disposicionBasura, config);
            dispatch(updateDisposicionBasura(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/disposicionBasura', disposicionBasura, config);
            dispatch(addDisposicionBasura(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: disposicionBasuraSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearDisposicionBasura());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Disposición de Basura"));
        dispatch(setLoading(false));
    }
}

export const eliminarDisposicionBasura = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/disposicionBasura/${id}`, {estado: false}, config);
                const { disposicionBasuras } = getState().disposicionBasura;
                dispatch(setDisposicionBasuras(disposicionBasuras.filter(disposicionBasura => disposicionBasura.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Disposición de Basura"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
    
}


export default DisposicionBasuraSlice.reducer;