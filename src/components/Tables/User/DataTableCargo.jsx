import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { eliminarCargo, obtenerCargos, setCargo } from '../../../redux/User/CargoSlice';
import Paginacion from '../../Paginacion';

const DataTableCargo = () => {
    const dispatch = useDispatch();
    const { cargos, loading, error } = useSelector((state) => state.cargo);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de elementos por página

    useEffect(() => {
        if (!cargos.length) {
            dispatch(obtenerCargos());
        }
    }, [dispatch, cargos]);

    // Spinner de carga
    if (loading && !cargos.length) {
        return (
            <div className="flex justify-center items-center h-64">
                <ClipLoader color="#0284c7" size={50} />
            </div>
        );
    }

    // Manejo de error
    if (error) return <p>Error: {error}</p>;

    // Cálculo de la paginación
    const indexOfLastCargo = currentPage * itemsPerPage;
    const indexOfFirstCargo = indexOfLastCargo - itemsPerPage;
    const currentCargos = cargos.slice(indexOfFirstCargo, indexOfLastCargo);
    const totalPages = Math.ceil(cargos.length / itemsPerPage);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
            <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
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
                        {currentCargos.length ? (currentCargos.map((cargo, key) => (
                            <tr 
                                key={cargo.id}
                                className="hover:bg-slate-200 dark:hover:bg-slate-600"
                            >
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{indexOfFirstCargo + key + 1}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="text-black dark:text-white">{cargo.nombre}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                        ${cargo.estado ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                        {cargo.estado ? 'Activo' : 'Inactivo'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button 
                                            onClick={ () => dispatch(setCargo(cargo))}
                                            className="hover:text-sky-600 dark:hover:text-sky-600 text-slate-500 dark:text-slate-200" 
                                            title="Editar"
                                        >
                                            <PencilSquareIcon className="size-4.5" />
                                        </button>
                                        <button 
                                            onClick={ () => dispatch(eliminarCargo(cargo.id))}
                                            className="hover:text-red-600 dark:hover:text-red-600 text-slate-500 dark:text-slate-200" title="Eliminar">
                                            <TrashIcon className="size-4.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))) : (
                                <tr>
                                    <td colSpan={3}>No hay cargos registrados aún</td>
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
    );
};


export default DataTableCargo;

