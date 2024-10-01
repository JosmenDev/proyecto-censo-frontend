import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer"; 
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import hasAccess from "../helpers/hasAccess";
import { autenticarUsuario } from "../redux/auth/AuthSlice";

const RutaProtegida = ({ allowRoles }) => {
    const dispatch = useDispatch();
    const {auth, cargando} = useSelector(state => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(autenticarUsuario());
    }, [dispatch]);

    if (cargando) return 'cargando ...';

    if (!auth.id) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <div className="dark:bg-boxdark-2 dark:text-bodydark font-poppins text-sm ">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="flex flex-1 flex-col gap-5 min-h-screen overflow-y-auto overflow-x-hidden">
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main className="flex-grow">
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {hasAccess(auth.idrol, allowRoles)? <Outlet/> : <div>No tienes acceso a esta página</div> }
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RutaProtegida;
