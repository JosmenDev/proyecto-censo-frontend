import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Paginacion from "../../Paginacion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarMedidaProteccion, obtenerMedidaProtecciones, setMedidaProteccion } from "../../../redux/HoustingCharacteristics/MedidaProteccionSlice";

const DataTableMedidaProteccion = () => {

    const dispatch = useDispatch();
    const { medidaProtecciones, loading, error } = useSelector( (state) => state.medidaProteccion);
    
    useEffect(() => {
        if (!medidaProtecciones.length) {
            dispatch(obtenerMedidaProtecciones());
        }
    }, [dispatch, medidaProtecciones]);



    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de elementos por página
    // Cálculo de la paginación
    const indexOfLastMedidaProteccion = currentPage * itemsPerPage;
    const indexOfFirstMedidaProteccion = indexOfLastMedidaProteccion - itemsPerPage;
    const currentMedidaProtecciones = medidaProtecciones.slice(indexOfFirstMedidaProteccion, indexOfLastMedidaProteccion);
    const totalPages = Math.ceil(medidaProtecciones.length / itemsPerPage);

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
                        {currentMedidaProtecciones.length ? (currentMedidaProtecciones.map((medidaProteccion, key) => (
                            <tr key={medidaProteccion.id}
                                className="hover:bg-slate-200 dark:hover:bg-slate-600"
                            >
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{indexOfFirstMedidaProteccion + key + 1}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="text-black dark:text-white">{medidaProteccion.nombre}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                        ${medidaProteccion.estado ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                        {medidaProteccion.estado ? 'Activo' : 'Inactivo'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button 
                                            onClick={ () => dispatch(setMedidaProteccion(medidaProteccion))}
                                            className="hover:text-sky-600 dark:hover:text-sky-600 text-slate-500 dark:text-slate-200" 
                                            title="Editar"
                                        >
                                            <PencilSquareIcon className="size-4.5" />
                                        </button>
                                        <button 
                                            onClick={ () => dispatch(eliminarMedidaProteccion(medidaProteccion.id))}
                                            className="hover:text-red-600 dark:hover:text-red-600 text-slate-500 dark:text-slate-200" title="Eliminar">
                                            <TrashIcon className="size-4.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))) : (
                                <tr>
                                    <td colSpan={3}>No hay Medidas de Protección registradas aún</td>
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

export default DataTableMedidaProteccion