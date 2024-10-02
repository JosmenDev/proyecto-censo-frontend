import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/AuthSlice';
import CargoSlice from './User/CargoSlice';
import OcupacionSlice from './Person/OcupacionSlice';
import ReligionSlice from './Person/ReligionSlice';
import ParentescoSlice from './Person/ParentescoSlice';

export const Store = configureStore({
    reducer: {
        auth: authSlice,
        cargo: CargoSlice,
        ocupacion: OcupacionSlice,
        religion: ReligionSlice,
        parentesco: ParentescoSlice
    }
});