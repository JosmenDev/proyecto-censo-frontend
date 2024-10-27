import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Auth/AuthSlice';
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
import cloracionSlice from './HoustingCharacteristics/CloracionSlice';
import combustibleCocinaSlice from './HoustingCharacteristics/CombustibleCocinaSlice';
import disposicionBasuraSlice from './HoustingCharacteristics/DisposicionBasuraSlice';
import materialViviendaSlice from './HoustingCharacteristics/MaterialViviendaSlice';
import medidaProteccionSlice from './HoustingCharacteristics/MedidaProteccionSlice';
import servicioHigienicoSlice from './HoustingCharacteristics/ServicioHigienicoSlice';
import abastecimientoAguaSlice from './HoustingCharacteristics/AbastecimientoAguaSlice';

export const Store = configureStore({
    reducer: {
        // Auth
        auth: authSlice,
        // Users
        cargo: cargoSlice,
        // Req. Persons
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
        enfermedad: enfermedadSlice,
        // Req. characteristics
        cloracion: cloracionSlice,
        combustibleCocina: combustibleCocinaSlice,
        abastecimientoAgua: abastecimientoAguaSlice,
        disposicionBasura: disposicionBasuraSlice,
        materialVivienda: materialViviendaSlice,
        medidaProteccion: medidaProteccionSlice,
        servicioHigienico: servicioHigienicoSlice
    }
});