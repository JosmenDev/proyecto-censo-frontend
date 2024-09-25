import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer"; // Asegúrate de que esté bien importado
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (cargando) return 'cargando ...';

    return (
        <>
            <div className="dark:bg-boxdark-2 dark:text-bodydark font-montserrat text-sm">
                {/* <!-- ===== Page Wrapper Start ===== --> */}
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {auth.id ? <Outlet /> : <Navigate to="/" />}
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}

                        {/* <!-- ===== Footer Start ===== --> */}
                        <Footer />
                        {/* <!-- ===== Footer End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
                {/* <!-- ===== Page Wrapper End ===== --> */}
            </div>
        </>
    );
};

export default RutaProtegida;
