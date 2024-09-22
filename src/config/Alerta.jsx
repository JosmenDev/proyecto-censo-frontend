const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'text-red-500 border border-red-200 bg-red-50' : 'text-green-500 border border-green-200 bg-green-50'} mt-5 px-4 py-3 text-sm rounded-md text-center `}>
            {alerta.msg}
        </div>
    );
};

export default Alerta;