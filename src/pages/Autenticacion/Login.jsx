import React from "react";
import logoRegiSalud from "../../assets/images/logo-regi-salud.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm( {mode: "onChange"});

    const onSubmit = (data) => {
        console.log('Despues de la validacion', data);
    };

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
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="mt-10" 
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
