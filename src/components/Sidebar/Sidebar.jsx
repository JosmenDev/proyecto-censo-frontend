import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import LogoMenu from '../../assets/images/logo-menu.svg';
import { Bars3Icon, DocumentChartBarIcon, DocumentCheckIcon, HomeIcon, ListBulletIcon, MapPinIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

  // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
            return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [sidebarOpen]);

  // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            {/* SIDEBAR HEADER */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <img src={LogoMenu} alt="Logo" />
                </NavLink>

                <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                className="block lg:hidden"
                >
                    <Bars3Icon  className="size-6" />  
                </button>
            </div>
            {/* SIDEBAR HEADER */}

            <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent duration-300 ease-linear">
                {/* Sidebar Menu */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                {/* Menu Group */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* Menu Inicio */}
                            <li>
                                <NavLink
                                to="/calendar"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                <HomeIcon className="size-6" />
                                Inicio
                                </NavLink>
                            </li>
                            {/* Menu Inicio */}
                            {/* More menu items can be added here */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                                >
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            (pathname === '/forms' || pathname.includes('forms')) &&
                                            'bg-graydark dark:bg-meta-4'
                                            }`}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <UserIcon className="size-6" />
                                            Adm. Usuarios
                                            <svg
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                fill=""
                                            />
                                            </svg>
                                        </NavLink>
                                        {/* <!-- Dropdown Menu Start --> */}
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-elements"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Personal Médico
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Cargo
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Usuario
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                    </>
                                )}
                            </SidebarLinkGroup>
                            <li>
                                <NavLink
                                to="/calendar"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                <UserGroupIcon className="size-6" />
                                Equipos
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">REQUERIMIENTOS</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* More menu items can be added here */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                                >
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            (pathname === '/forms' || pathname.includes('forms')) &&
                                            'bg-graydark dark:bg-meta-4'
                                            }`}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <UsersIcon className="size-6" />
                                            Req. Persona
                                            <svg
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                fill=""
                                            />
                                            </svg>
                                        </NavLink>
                                        {/* <!-- Dropdown Menu Start --> */}
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-elements"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Ocupación
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Religión
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Parentesco
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Cargo de Comunidad
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Tipo de Discapacidad
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Acción de Emergencia
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Seguro de Salud
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Grupo Étnico
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Nivel Educativo
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Medios de Información
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Enfermedades
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                    </>
                                )}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                                >
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            (pathname === '/forms' || pathname.includes('forms')) &&
                                            'bg-graydark dark:bg-meta-4'
                                            }`}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <MapPinIcon className="size-6" />
                                            Req. Localización Vivienda
                                            <svg
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                fill=""
                                            />
                                            </svg>
                                        </NavLink>
                                        {/* <!-- Dropdown Menu Start --> */}
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-elements"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Sector
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Centro Poblado
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                    </>
                                )}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                                >
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            (pathname === '/forms' || pathname.includes('forms')) &&
                                            'bg-graydark dark:bg-meta-4'
                                            }`}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <ListBulletIcon className="size-6" />
                                            Req. Características Vivienda
                                            <svg
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                fill=""
                                            />
                                            </svg>
                                        </NavLink>
                                        {/* <!-- Dropdown Menu Start --> */}
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-elements"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Meterial Vivienda
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Servicio Higiénico
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Disposición Basura
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Cloración
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Combustible de Cocina
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                    to="/forms/form-layout"
                                                    className={({ isActive }) =>
                                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                        (isActive && '!text-white')
                                                    }
                                                    >
                                                    Medidas Protección
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                    </>
                                )}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">FICHA FAMILIAR</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* Menu Inicio */}
                            <li>
                                <NavLink
                                to="/calendar"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                <DocumentCheckIcon className="size-6" />
                                Ficha Familiar
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">REPORTES</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                to="/calendar"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                <DocumentChartBarIcon className="size-6" />
                                Reporte Fichas Familiares
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/calendar"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                <DocumentChartBarIcon className="size-6" />
                                Reporte Enfermedades
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            {/* Sidebar Menu End */}
            </div>
        </aside>
    );
};

export default Sidebar;
