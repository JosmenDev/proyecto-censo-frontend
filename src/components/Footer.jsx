const Footer = () => {
    return (
        <>
            <footer className="bg-white dark:bg-boxdark border-t dark:border-none border-stroke dark:border-zink-600 absolute right-0 bottom-0 px-4 h-14 w-full flex items-center justify-between py-3 shadow-default">
                <div className="mx-auto max-w-screen-2xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center text-slate-400 dark:text-zink-200">
                        <div className="text-center lg:text-left">
                            {new Date().getFullYear()} © RegiSalud.
                        </div>
                        <div className="hidden lg:block text-right">
                            Desarrollado por <span className="text-success">JosmenDev</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
