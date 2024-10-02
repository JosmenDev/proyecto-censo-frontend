import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-4 items-center mt-4">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-transparent text-slate-800 disabled:text-slate-500 dark:text-white dark:disabled:text-slate-500"
            >
                <ArrowLeftIcon className="size-5" />
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-transparent text-slate-800 disabled:text-slate-500 dark:text-white dark:disabled:text-slate-500"
            >
                <ArrowRightIcon className="size-5" />
            </button>
        </div>
    );
};

export default Paginacion