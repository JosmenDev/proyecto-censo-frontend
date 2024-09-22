import React, { useState } from "react";
import logoRegiSalud from "../../assets/images/logo-regi-salud.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import Alerta from "../../config/Alerta";

export const Login = () => {

    useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm( {mode: "onChange"});
    const [ alerta, setAlerta ] = useState({});

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        // const { username, password } = formData;
        try {
            const { data } = await clienteAxios.post('/auth/login', formData);
            console.log('Despues de la validacion', data.token);
            setAlerta({});
            if (data.confirmado) {
                localStorage.getItem('token', data.token);
                navigate('/inicio');
            }
            else {
                navigate(`/confirmar/${data.token}`);
            }
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
            <div className="!px-10 !py-12 card-body">
                <Link to="/">
                    <img src={logoRegiSalud} alt="Logo de RegiSalud" className="block h-44 mx-auto" />
                </Link>
                <div className="mt-8 text-center">
                    <h4 className="mb-1 text-sky-500">Bienvenido!</h4>
                    <p className="text-slate-500">Ingresa tus credenciales para iniciar sesión.</p>
                </div>
                { msg && (<Alerta alerta={alerta}/>)}
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="mt-8" 
                    id="signInForm"
                >
                    <div className="mb-3">
                        <label htmlFor="username" className="inline-block mb-2 text-base font-medium">Nombre de Usuario</label>
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
                            className={`form-input focus:outline-none focus:border-custom-500 ${errors.username ? 'border-red-500' : 'border-slate-200'}`} 
                            placeholder="Ingresa nombre de usuario"
                        />
                        {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Contraseña</label>
                        <input 
                            type="password" 
                            id="password"
                            {...register("password", { required: 'El campo "Contraseña" es obligatorio' })}
                            className={`form-input  focus:outline-none focus:border-custom-500 ${errors.password ? 'border-red-500' : 'border-slate-200'}`} 
                            placeholder="Ingresa contraseña" 
                        />
                        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="w-full text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100">
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
