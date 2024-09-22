import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import logoRegiSalud from "../../assets/images/logo-regi-salud.svg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Alerta from '../../config/Alerta';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ConfirmarCuenta = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm( {mode: "onChange"});
  const [ username, setUsername ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  const [ tokenValido, setTokenValido ] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const {token} = params;

  const MySwal = withReactContent(Swal);

  useEffect ( () => {
    const actualizarPassword = async () => {
      try {
        const {data} = await clienteAxios(`/auth/confirmar/${token}`);
        setUsername(data.username);
        setTokenValido(true);
        setAlerta({});
      } catch (error) {
        console.log(error.response.data.msg);
        setAlerta( {
          msg: error.response.data.msg,
          error: true
        });
      }
    };
    actualizarPassword();
  },[]);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const { data } = await clienteAxios.post(`/auth/confirmar/${token}`, formData);
      // console.log(data.msg);
      setAlerta({});
      // Alerta aqui
      MySwal.fire({
        title: data.msg,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
        willClose: () => {
          navigate('/');
        },
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  };

  // Usamos `watch` para observar el valor del campo password
  const password = watch("password");

  const { msg } = alerta;
  return (
    <>
      <div className="!px-10 !py-12 card-body">
        <Link to="/">
            <img src={logoRegiSalud} alt="Logo de RegiSalud" className="block h-44 mx-auto" />
        </Link>
        <div className="mt-8 text-center">
            <h4 className="mb-1 text-sky-500">Confirma tu cuenta!</h4>
            <p className="text-slate-500">Actualiza tu contraseña para ingresar al sistema.</p>
        </div>
        {msg && (
          <Alerta alerta={alerta}/>
        )}
        { tokenValido && (
          <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="mt-8" 
          id="signInForm"
          >
          <div className="mb-3">
            <label htmlFor="username" className="inline-block mb-2 text-base font-medium">Nombre de Usuario</label>
            <input 
                type="text" 
                id="username"
                value={username}
                {...register("username")}
                className={`form-input focus:outline-none focus:border-custom-50 read-only:bg-slate-50 ${errors.username ? 'border-red-500' : 'border-slate-200'}`} 
                readOnly
                placeholder="Ingresa nombre de usuario"
            />
            {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Nueva Contraseña</label>
            <input 
                type="password" 
                id="password"
                {...register("password", { 
                  required: 'El campo "Nueva Contraseña" es obligatorio', 
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener por lo menos 6 caracteres'
                  }
                })}
                className={`form-input  focus:outline-none focus:border-custom-500 ${errors.password ? 'border-red-500' : 'border-slate-200'}`} 
                placeholder="Ingresa nueva contraseña" 
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="nuevoPassword" className="inline-block mb-2 text-base font-medium">Repetir Contraseña</label>
            <input 
                type="password" 
                id="nuevoPassword"
                {...register("nuevoPassword", { 
                  required: 'El campo "Repetir Contraseña" es obligatorio',
                  validate: value => value === password || 'Las contraseñas no coinciden'
                })}
                className={`form-input focus:outline-none focus:border-custom-500 ${errors.nuevoPassword ? 'border-red-500' : 'border-slate-200'}`} 
                placeholder="Repite contraseña nueva" 
            />
            {errors.nuevoPassword && <span className="text-sm text-red-500">{errors.nuevoPassword.message}</span>}
          </div>
          <div className="mt-10">
            <button type="submit" className="w-full text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100">
                Actualizar Contraseña
            </button>
          </div>
        </form>)}
    </div>
    </>
  )
}

export default ConfirmarCuenta