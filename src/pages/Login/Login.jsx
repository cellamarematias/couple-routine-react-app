import React from 'react';
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useLazyPostUserQuery } from '../../redux/api/usersApi';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const [ trigger, { data, isLoading, isSuccess, isError, isFetching, isUninitialized } ] = useLazyPostUserQuery(data);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => trigger(data);
  const navigate = useNavigate();

  if (isFetching) {
    return <h1>Loading</h1>
  } 

  if (isSuccess) {
    sessionStorage.setItem('authorized', true);
    sessionStorage.setItem('user', data.user);
    navigate('/expenses');
  } else {
  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flex}>
          <label htmlFor="usuario">Usuario</label>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="" {...register("usuario", { required: true}) } />
          {errors.usuario && <span>Este campo es requerido</span>}
          
          <label htmlFor="password">Contraseña</label>
          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>Este campo es requerido</span>}
          
          <input type="submit" />
        </form>
      </div>
    )
  }
};
