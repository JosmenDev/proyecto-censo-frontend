import { createSlice } from "@reduxjs/toolkit";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const initialState = {
    cargos: [],
    cargo: null,
    loading: false,
    error: null
}

const CargoSlice = createSlice( {
    name: 'cargo',
    initialState,
    reducers: {
        setCargos(state, action) {
            state.cargos = action.payload;
        },
        setCargo(state, action) {
            state.cargo = action.payload;
        },
        addCargo(state, action) {
            state.cargos = [...state.cargos, action.payload];
        },
        updateCargo(state, action) {
            const index = state.cargos.findIndex(cargo => cargo.id === action.payload.id);
            if (index !== -1) {
                state.cargos[index] = action.payload;
            }
        },
        clearCargo(state) {
            state.cargo = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setCargo, setCargos, addCargo, updateCargo, clearCargo, setLoading, setError } = CargoSlice.actions;
const MySwal = withReactContent(Swal);

export const obtenerCargos = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        dispatch(setLoading(true));
        const { data } = await clienteAxios.get('/cargo', config);
        dispatch(setCargos(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener cargos"));
        dispatch(setLoading(false));
    }
};

export const guardarCargo = (cargo) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { cargo : cargoSeleccionado } = getState().cargo;

    try {
        dispatch(setLoading(true));
        if (cargoSeleccionado) {
            const { data } = await clienteAxios.put(`/cargo/${cargoSeleccionado.id}`, cargo, config);
            dispatch(updateCargo(data));
        } else {
            const { data } = await clienteAxios.post('/cargo', cargo, config);
            dispatch(addCargo(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: cargoSeleccionado? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearCargo());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar cargo"));
        dispatch(setLoading(false));
    }
}

export const eliminarCargo = (id) => async (dispatch, getState) => {
    console.log(id);
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
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
                await clienteAxios.patch(`/cargo/${id}`, { estado: false }, config);
                const { cargos } = getState().cargo;
                const listaActualizada = cargos.filter(cargo => cargo.id !== id);
                dispatch(setCargos(listaActualizada));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar cargo"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    });      
}

export default CargoSlice.reducer;