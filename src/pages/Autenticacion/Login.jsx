import React from "react";
import logoRegiSalud from "../../assets/images/logo-regi-salud.svg";
import { Link } from "react-router-dom";

export const Login = () => {

    return (
        <>
            <div className="!px-10 !py-12 card-body">
                <Link to="/">
                    <img src={logoRegiSalud} alt="Logo de RegiSalud" className="block h-44 mx-auto"/>
                </Link>
                <div className="mt-8 text-center">
                    <h4 className="mb-1 text-sky-500">Bievenido !</h4>
                    <p className="text-slate-500">Ingresa tus credenciales para iniciar Sesión.</p>
                </div>
                <form action="" className="mt-10" id="signInForm">
                    <div className="mb-3">
                        <label htmlFor="username" className="inline-block mb-2 text-base font-medium">Nombre de Usuario</label>
                        <input type="text" id="username" className="form-input border-slate-200 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400" placeholder="Ingresa nombre de usuario" />
                        <div id="username-error" className="hidden mt-1 text-sm text-red-500">Please enter a valid email address.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Contraseña</label>
                        <input type="password" id="password" className="form-input border-slate-200 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400" placeholder="Ingresa contraseña" />
                        <div id="password-error" className="hidden mt-1 text-sm text-red-500">Password must be at least 8 characters long and contain both letters and numbers.</div>
                    </div>
                    <div className="mt-10">
                    <button type="submit" className="w-full text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100">
                        Ingresar
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}
