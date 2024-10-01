import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

const data = [
    {
        id: '1',
        nombre: 'Free package',
        estado: true,
    },
    {
        id: '2',
        nombre: 'Standard Package',
        estado: true,
    },
    {
        id: '3',
        nombre: 'Business Package',
        estado: true,
    },
    {
        id: '4',
        nombre: 'Standard Package',
        estado: true,
    },
];

const DataTableDefault = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                N°
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Nombre
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Estado
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dataItem, key) => (
                        <tr key={key}>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {dataItem.id}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <p className="text-black dark:text-white">
                                    {dataItem.nombre}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                        ${dataItem.estado ? 'bg-success text-success' : 'bg-danger text-danger'}`}
                                >
                                    {dataItem.estado ? 'Activo' : 'Inactivo'}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button className="hover:text-sky-600 text-slate-500 dark:text-slate-200">
                                        <PencilSquareIcon className="size-4.5"/>
                                    </button>
                                    <button className="hover:text-sky-600 text-slate-500 dark:text-slate-200">
                                        <TrashIcon className="size-4.5"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTableDefault;

