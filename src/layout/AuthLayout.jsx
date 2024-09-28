import { Link, Outlet } from "react-router-dom";
import React from "react";
import LogoRegiSalud from "../assets/images/logo-regi-salud.svg";

const AuthLayout = () => {
    return (
        <div className="font-poppins text-sm flex min-h-screen items-center justify-center bg-gray-100">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-lg flex flex-col items-center justify-center p-6">
                <Link className="inline-block w-60 mb-5" to="/">
                    <img className="hidden dark:block" src={LogoRegiSalud} alt="Logo" />
                    <img className="dark:hidden" src={LogoRegiSalud} alt="Logo" />
                </Link>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
