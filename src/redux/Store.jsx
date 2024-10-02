import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/AuthSlice';
import CargoSlice from './User/CargoSlice';
import OcupacionSlice from './Person/OcupacionSlice';

export const Store = configureStore({
    reducer: {
        auth: authSlice,
        cargo: CargoSlice,
        ocupacion: OcupacionSlice
    }
});