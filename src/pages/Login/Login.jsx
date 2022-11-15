import React from 'react';
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useLazyPostUserQuery } from '../../redux/api/usersApi';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader.jsx';

export default function Login() {
  const [ trigger, { data, isLoading, isSuccess, isError, isFetching, isUninitialized } ] = useLazyPostUserQuery(data);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => trigger(data);
  const navigate = useNavigate();

  if (isFetching) {
    return <Loader />
  } 

  if (isSuccess) {
    console.log(data);
    sessionStorage.setItem('authorized', true);
    sessionStorage.setItem('user', data.user);
    sessionStorage.setItem('token', data.token);
    navigate('/expenses');
  } else {
  return (
      <div className={styles.container}>
        <div>
          <h2>Log<span>in</span></h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flex}>
          {/* register your input into the hook by invoking the "register" function */}
          <input placeholder='usuario' {...register("usuario", { required: true}) } />
          {errors.usuario && <span>Este campo es requerido</span>}
          
          {/* include validation with required or other standard HTML validation rules */}
          <input placeholder='contraseña' type={'password'}{...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>Este campo es requerido</span>}
          
          <input type="submit"  value={'entrar'}/>
        </form>
      </div>
    )
  }
};
