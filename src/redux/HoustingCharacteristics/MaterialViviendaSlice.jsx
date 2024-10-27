import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    materialViviendas: [],
    materialVivienda: null,
    loading: false,
    error: null
};

const MaterialViviendaSlice = createSlice({
    name: 'materialVivienda',
    initialState,
    reducers: {
        setMaterialViviendas (state, action) {
            state.materialViviendas = action.payload
        },
        setMaterialVivienda (state, action ) {
            state.materialVivienda = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addMaterialVivienda (state, action) {
            state.materialViviendas = [ ...state.materialViviendas, action.payload]
        },
        updateMaterialVivienda (state, action) {
            const index = state.materialViviendas.findIndex(materialVivienda => materialVivienda.id === action.payload.id)
            if (index !== -1) {
                state.materialViviendas[index] = action.payload
            }
        },
        clearMaterialVivienda(state) {
            state.materialVivienda = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setMaterialViviendas, setMaterialVivienda, setLoading, addMaterialVivienda, updateMaterialVivienda, clearMaterialVivienda, setError} = MaterialViviendaSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerMaterialViviendas = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/materialVivienda', config);
        dispatch(setMaterialViviendas(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Material de Viviendas"));
        dispatch(setLoading(false));
    }
}

export const guardarMaterialVivienda = (materialVivienda) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { materialVivienda : materialViviendaSeleccionada } = getState().materialVivienda;
    try {
        if (materialViviendaSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/materialVivienda/${materialViviendaSeleccionada.id}`, materialVivienda, config);
            dispatch(updateMaterialVivienda(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/materialVivienda', materialVivienda, config);
            dispatch(addMaterialVivienda(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: materialViviendaSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearMaterialVivienda());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Material de Vivienda"));
        dispatch(setLoading(false));
    }
}

export const eliminarMaterialVivienda = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/materialVivienda/${id}`, {estado: false}, config);
                const { materialViviendas } = getState().materialVivienda;
                dispatch(setMaterialViviendas(materialViviendas.filter(materialVivienda => materialVivienda.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Material de Vivienda"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
}


export default MaterialViviendaSlice.reducer;