import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/AuthSlice';
import cargoSlice from './User/CargoSlice';
import ocupacionSlice from './Person/OcupacionSlice';
import religionSlice from './Person/ReligionSlice';
import parentescoSlice from './Person/ParentescoSlice';
import cargoComunidadSlice from './Person/CargoComunidadSlice';
import tipoDiscapacidadSlice from './Person/TipoDiscapacidadSlice';
import accionEmergenciaSlice from './Person/AccionEmergenciaSlice';
import seguroSaludSlice from './Person/SeguroSaludSlice';
import grupoEtnicoSlice from './Person/GrupoEtnicoSlice';
import nivelEducativoSlice from './Person/NivelEducativoSlice';
import medioInformacionSlice from './Person/MedioInformacionSlice';
import enfermedadSlice from './Person/EnfermedadSlice';

export const Store = configureStore({
    reducer: {
        auth: authSlice,
        cargo: cargoSlice,
        ocupacion: ocupacionSlice,
        religion: religionSlice,
        parentesco: parentescoSlice,
        cargoComunidad: cargoComunidadSlice,
        tipoDiscapacidad: tipoDiscapacidadSlice,
        accionEmergencia: accionEmergenciaSlice,
        seguroSalud: seguroSaludSlice,
        grupoEtnico: grupoEtnicoSlice,
        nivelEducativo: nivelEducativoSlice,
        medioInformacion: medioInformacionSlice,
        enfermedad: enfermedadSlice
    }
});