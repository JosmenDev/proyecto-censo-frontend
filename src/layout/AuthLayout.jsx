import { Outlet } from "react-router-dom";
import AuthIcon from "../pages/Autenticacion/AuthIcon";
import React from "react";
const AuthLayout = () => {

    document.title = "Login | RegiSalud";

    React.useEffect(() => {
        const bodyElement = document.body;
        const classes = ['flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'font-public'];
        bodyElement.classList.add(...classes);

        return () => bodyElement.classList.remove(...classes);
    }, []);

    return (
        <>
            <div className="relative">
                <AuthIcon/>
                <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default AuthLayout