import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/AuthSlice';
import CargoSlice from './User/CargoSlice';
import OcupacionSlice from './Person/OcupacionSlice';
import ReligionSlice from './Person/ReligionSlice';
import ParentescoSlice from './Person/ParentescoSlice';
import CargoComunidadSlice from './Person/CargoComunidadSlice';
import TipoDiscapacidadSlice from './Person/TipoDiscapacidadSlice';
import AccionEmergenciaSlice from './Person/AccionEmergenciaSlice';
import SeguroSaludSlice from './Person/SeguroSaludSlice';
import GrupoEtnicoSlice from './Person/GrupoEtnicoSlice';
import NivelEducativoSlice from './Person/NivelEducativoSlice';

export const Store = configureStore({
    reducer: {
        auth: authSlice,
        cargo: CargoSlice,
        ocupacion: OcupacionSlice,
        religion: ReligionSlice,
        parentesco: ParentescoSlice,
        cargoComunidad: CargoComunidadSlice,
        tipoDiscapacidad: TipoDiscapacidadSlice,
        accionEmergencia: AccionEmergenciaSlice,
        seguroSalud: SeguroSaludSlice,
        grupoEtnico: GrupoEtnicoSlice,
        nivelEducativo: NivelEducativoSlice
    }
});