import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { clearMedioInformacion, guardarMedioInformacion } from '../../../redux/Person/MedioInformacionSlice';
import Alerta from '../../Alerta';

const FormMedioInformacion = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({mode: 'onChange'});

    const { medioInformacion, loading, error } = useSelector((state) => state.medioInformacion);
    const [ alerta, setAlerta ] = useState({});

    useEffect(() => {
        if (medioInformacion) {
            setValue('nombre', medioInformacion.nombre);
        }
    }, [medioInformacion, setValue]);

    const onSubmit = async formData => {
        dispatch(guardarMedioInformacion(formData));
        reset();
    }

    useEffect( () => {
        if (error) {
            setAlerta({
                msg: error,
                error: true,
            });
        }
    }, [error]);

    const { msg } = alerta;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6.5">
                    {msg && (<Alerta alerta={alerta}/>)}
                    <div className="mb-4.5">
                        <label htmlFor="nombre" className="mb-2.5 block text-black dark:text-white">
                            Nombre <span className="text-meta-1">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="nombre"
                            {...register("nombre", {
                                required: 'El campo es "Nombre" es obligatorio',
                            })}
                            placeholder="Ingresa nombre"
                            className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none  dark:bg-form-input dark:text-white dark:focus:border-sky ${errors.nombre ? 'border-red-500' : ' dark:border-form-strokedark border-slate-200'}`}
                        />
                        {errors.nombre && <span className="text-sm text-red-500">{errors.nombre.message}</span>}
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xsm:flex-row">
                        <button
                            className="w-full cursor-pointer rounded-lg border border-sky-500 bg-sky-400 p-2 text-white transition hover:bg-opacity-90"
                            disabled={loading}
                        >
                            {loading ? "Procesando ..." : !medioInformacion? "Guardar" : "Actualizar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                dispatch(clearMedioInformacion());
                            }}
                            className="w-full cursor-pointer rounded-lg border border-slate-500 bg-slate-400 p-2 text-white transition hover:bg-opacity-90"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormMedioInformacion