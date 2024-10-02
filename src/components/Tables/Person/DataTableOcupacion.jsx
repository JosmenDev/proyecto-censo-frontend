import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Paginacion from "../../Paginacion";
import { useEffect, useState } from "react";
import { eliminarOcupacion, obtenerOcupaciones, setOcupacion } from "../../../redux/Person/OcupacionSlice";
import { useDispatch, useSelector } from "react-redux";

const DataTableOcupacion = () => {

    const dispatch = useDispatch();
    const { ocupaciones, loading, error } = useSelector( (state) => state.ocupacion);
    
    useEffect(() => {
        if (!ocupaciones.length) {
            dispatch(obtenerOcupaciones());
        }
    }, [dispatch, ocupaciones]);



    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de elementos por página
    // Cálculo de la paginación
    const indexOfLastOcupacion = currentPage * itemsPerPage;
    const indexOfFirstOcupacion = indexOfLastOcupacion - itemsPerPage;
    const currentOcupaciones = ocupaciones.slice(indexOfFirstOcupacion, indexOfLastOcupacion);
    const totalPages = Math.ceil(ocupaciones.length / itemsPerPage);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
            <div className="max-w-full overflow-x-auto  scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="py-4 px-4 font-medium text-black dark:text-white">N°</th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Nombre</th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Estado</th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOcupaciones.length ? (currentOcupaciones.map((ocupacion, key) => (
                            <tr key={ocupacion.id}
                                className="hover:bg-slate-200 dark:hover:bg-slate-600"
                            >
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{indexOfFirstOcupacion + key + 1}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="text-black dark:text-white">{ocupacion.nombre}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                        ${ocupacion.estado ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                        {ocupacion.estado ? 'Activo' : 'Inactivo'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button 
                                            onClick={ () => dispatch(setOcupacion(ocupacion))}
                                            className="hover:text-sky-600 dark:hover:text-sky-600 text-slate-500 dark:text-slate-200" 
                                            title="Editar"
                                        >
                                            <PencilSquareIcon className="size-4.5" />
                                        </button>
                                        <button 
                                            onClick={ () => dispatch(eliminarOcupacion(ocupacion.id))}
                                            className="hover:text-red-600 dark:hover:text-red-600 text-slate-500 dark:text-slate-200" title="Eliminar">
                                            <TrashIcon className="size-4.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))) : (
                                <tr>
                                    <td colSpan={3}>No hay Ocupaciones registrados aún</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* Controles de Paginación */}
                <Paginacion
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                />
            </div>
        </div>
    )
}

export default DataTableOcupacion