import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/AuthSlice';

export const Store = configureStore({
    reducer: {
        auth: authSlice
    }
});