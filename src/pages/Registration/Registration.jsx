import React from "react";
import { Typography, TextField, Paper, Button, Avatar } from "@mui/material";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Registration failed!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create Account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="Full Name"
        fullWidth
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register("fullName", { required: "Please insert Your Full Name" })}
      />
      <TextField
        className={styles.field}
        label="E-mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register("email", { required: "Please insert email" })}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Password"
        fullWidth
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("password", { required: "Please insert password" })}
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Register
      </Button>
      </form>
    </Paper>
  );
};

export default Registration;
