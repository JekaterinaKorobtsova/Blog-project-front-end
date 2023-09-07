import React from "react";
import { Typography, TextField, Paper, Button } from "@mui/material";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Failed to authorize!')
    };

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    };
  };


  if (isAuth) {
    return <Navigate to='/' />
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login to account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register("email", { required: "Please insert email" })}
          fullWidth
        />
        <TextField 
        className={styles.field} 
        label="Password" 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("password", { required: "Please insert password" })}
        fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" 
        fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
