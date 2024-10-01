import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import Alerta from "../../components/Alerta";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/auth/AuthSlice";

export const Login = () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm( {mode: "onChange"});
    const [ alerta, setAlerta ] = useState({});

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        // const { username, password } = formData;
        try {
            const { data } = await clienteAxios.post('/auth/login', formData);
            // console.log('Despues de la validacion', data.token);
            setAlerta({});
            if (data.confirmado) {
                localStorage.setItem('token', data.token);
                dispatch(setAuth(data));
                // console.log('Usuario confirmado');
                navigate('/inicio');
            }
            else {
                navigate(`confirmar/${data.token}`);
            }
            setAlerta({});
        } catch (error) {
            // console.log(error.response.data.msg);
            // errors.password.message = error.response.data.msg;
            if (error.response && error.response.data.msg) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div className="w-full p-4 sm:p-12.5 xl:p-4">
                <span className="mb-1.5 block font-semibold text-sky-500 text-2xl text-center"> Bienvenido </span>
                <h2 className="mb-6 text-base font-semibold text-slate-500 dark:text-white sm:text-base text-center">
                    Inicia Sesión para continuar en RegiSalud
                </h2>
                {msg && (<Alerta alerta={alerta} />)}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-slate-500 dark:text-white">
                            Nombre de Usuario
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                {...register("username", {
                                    required: 'El campo "Nombre de Usuario" es obligatorio',
                                    pattern: {
                                        value: /^[0-9]{8}$/,
                                        message: 'El "Nombre de Usuario" debe ser numérico y de 8 dígitos'
                                    }
                                })}
                                placeholder="Ingresa nombre de usuario"
                                className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none  dark:bg-form-input dark:text-white dark:focus:border-sky ${errors.username ? 'border-red-500' : ' dark:border-form-strokedark border-slate-200'}`}
                            />
                            {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
                        </div>
                    </div>
    
                    <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-slate-500 dark:text-white">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: 'El campo "Contraseña" es obligatorio' })}
                                className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none  dark:bg-form-input dark:text-white dark:focus:border-sky-400 ${errors.password ? 'border-red-500' : 'dark:border-form-strokedark border-slate-200'}`}
                                placeholder="Ingresa contraseña"
                            />
                            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                        </div>
                    </div>
    
                    <div className="mb-5">
                        <input
                            type="submit"
                            value="Ingresar"
                            className="w-full cursor-pointer rounded-lg border border-sky-500 bg-sky-400 p-2 text-white transition hover:bg-opacity-90"
                        />
                    </div>
                </form>
            </div>
        </>
    );
    
};
