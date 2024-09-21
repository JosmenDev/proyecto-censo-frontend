import { Outlet } from "react-router-dom";
import React from "react";
import AuthDecoracion from "../components/AuthDecoracion";
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
                <AuthDecoracion/>
                <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default AuthLayout