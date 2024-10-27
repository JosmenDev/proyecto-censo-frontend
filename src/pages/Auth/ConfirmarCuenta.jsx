import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Alerta from '../../components/Alerta';
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
    <div className="w-full p-4 sm:p-12.5 xl:p-4">
        <span className="mb-1.5 block font-semibold text-sky-500 text-2xl text-center"> Confirma tu cuenta </span>
        <h2 className="mb-6 text-base font-semibold text-slate-500 dark:text-white sm:text-base text-center">
          Actualiza tu cuenta para ingresar a RegiSalud
        </h2>
        {msg && (<Alerta alerta={alerta} />)}
        { tokenValido && (<form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="mb-2.5 block font-medium text-slate-500 dark:text-white">
                    Nombre de Usuario
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        {...register("username")}
                        placeholder="Ingresa nombre de usuario"
                        readOnly
                        className={`w-full rounded-lg border bg-transparent py-2 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none read-only:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky ${errors.username ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-slate-500 dark:text-white">
                    Nueva Contraseña
                </label>
                <div className="relative">
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
                        className={`w-full rounded-lg border bg-transparent py-2 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky-400 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                        placeholder="Ingresa nueva contraseña"
                    />
                    {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-slate-500 dark:text-white">
                    Repetir Contraseña
                </label>
                <div className="relative">
                    <input
                        type="password"
                        id="nuevoPassword"
                        {...register("nuevoPassword", { 
                          required: 'El campo "Repetir Contraseña" es obligatorio',
                          validate: value => value === password || 'Las contraseñas no coinciden'
                        })}
                        className={`w-full rounded-lg border bg-transparent py-2 pl-6 pr-10 text-slate-500 outline-none focus:border-sky-400 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-sky-400 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}                 
                        placeholder="Repite contraseña nueva" 
                    />
                    {errors.nuevoPassword && <span className="text-sm text-red-500">{errors.nuevoPassword.message}</span>}
                </div>
            </div>

            <div className="mb-5">
                <input
                    type="submit"
                    value="Actualizar Contraseña"
                    className="w-full cursor-pointer rounded-lg border border-sky-500 bg-sky-400 p-2 text-white transition hover:bg-opacity-90"
                />
            </div>
        </form>)}
    </div>
</>
  )
}

export default ConfirmarCuenta