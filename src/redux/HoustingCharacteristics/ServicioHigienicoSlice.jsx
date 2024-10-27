import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import clienteAxios from "../../config/axios";

const initialState = {
    servicioHigienicos: [],
    servicioHigienico: null,
    loading: false,
    error: null
};

const ServicioHigienicoSlice = createSlice({
    name: 'servicioHigienico',
    initialState,
    reducers: {
        setServicioHigienicos (state, action) {
            state.servicioHigienicos = action.payload
        },
        setServicioHigienico (state, action ) {
            state.servicioHigienico = action.payload
        },
        setLoading (state, action) {
            state.loading = action.payload
        },
        addServicioHigienico (state, action) {
            state.servicioHigienicos = [ ...state.servicioHigienicos, action.payload]
        },
        updateServicioHigienico (state, action) {
            const index = state.servicioHigienicos.findIndex(servicioHigienico => servicioHigienico.id === action.payload.id)
            if (index !== -1) {
                state.servicioHigienicos[index] = action.payload
            }
        },
        clearServicioHigienico(state) {
            state.servicioHigienico = null
        },
        setError (state, action) {
            state.error = action.payload
        }
    }
});

export const { setServicioHigienicos, setServicioHigienico, setLoading, addServicioHigienico, updateServicioHigienico, clearServicioHigienico, setError} = ServicioHigienicoSlice.actions;

const MySwal = withReactContent(Swal);

export const obtenerServicioHigienicos = () => async dispatch  =>  {
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
        const { data } = await clienteAxios('/servicioHigienico', config);
        dispatch(setServicioHigienicos(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al obtener Servicios Higiénicos"));
        dispatch(setLoading(false));
    }
}

export const guardarServicioHigienico = (servicioHigienico) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    const { servicioHigienico : servicioHigienicoSeleccionada } = getState().servicioHigienico;
    try {
        if (servicioHigienicoSeleccionada) {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.put(`/servicioHigienico/${servicioHigienicoSeleccionada.id}`, servicioHigienico, config);
            dispatch(updateServicioHigienico(data));
        } else {
            dispatch(setLoading(true));
            const { data } = await clienteAxios.post('/servicioHigienico', servicioHigienico, config);
            dispatch(addServicioHigienico(data));
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: servicioHigienicoSeleccionada? "Registro Actualizado Correctamente" : "Registro Guardado Correctamente",
            showConfirmButton: false,
            timer: 1000
        });
        dispatch(clearServicioHigienico());
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || "Error al guardar Servicio Higienico"));
        dispatch(setLoading(false));
    }
}

export const eliminarServicioHigienico = (id) => async (dispatch, getState) => {

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
                await clienteAxios.patch(`/servicioHigienico/${id}`, {estado: false}, config);
                const { servicioHigienicos } = getState().servicioHigienico;
                dispatch(setservicioHigienicos(servicioHigienicos.filter(servicioHigienico => servicioHigienico.id !== id)));
    
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registro eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            } catch (error) {
                dispatch(setError(error.response?.data.msg || "Error al eliminar Servicios Higiénicos"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }); 
}


export default ServicioHigienicoSlice.reducer;