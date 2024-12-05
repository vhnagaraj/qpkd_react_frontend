import { Button, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (login) {
      const response = axios.post(
        "http://172.19.100.136:5000/api/authentication/login",

        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if ((await response).status === 200) {
        navigate("/encrypt");
      }
    } else {
      const response = axios.post(
        "http://172.19.100.136:5000/api/authentication/signup",

        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log({ res: response?.data });
    }
  };

  return (
    <Grid2
      container
      flexDirection={"column"}
      gap={2}
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        padding: 1,
        borderRadius: "10px",
        width: "400px",
        minHeight: "400px",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          mt: 4,
          background: "linear-gradient(to right, #5c6bc0, #512da8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 1000,
        }}
      >
        {login ? "LOGIN" : "SIGN UP"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {!login && (
          <Grid2 sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField {...field} placeholder="username" fullWidth />
              )}
            />
          </Grid2>
        )}

        <Grid2 sx={{ paddingLeft: "20px", paddingRight: "20px", mt: 2 }}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField {...field} placeholder="email" fullWidth />
            )}
          />
        </Grid2>

        <Grid2 sx={{ paddingLeft: "20px", paddingRight: "20px", mt: 2 }}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="password"
                fullWidth
                type="password"
              />
            )}
          />
        </Grid2>

        {loginError && (
          <Typography sx={{ color: "red", mt: 2 }}>{loginError}</Typography>
        )}

        <Grid2 container spacing={4} justifyContent={"center"} sx={{ mt: 5 }}>
          <Button
            onClick={() => {
              setLogin(false);
              setLoginError("");
            }}
            type="submit"
            sx={{
              background: "linear-gradient(to right, #5c6bc0, #512da8)",
              color: "white",
              borderRadius: "25px",
              fontWeight: 600,
              textTransform: "uppercase",
              width: "100px",
            }}
          >
            SIGN UP
          </Button>
          <Button
            id="login"
            onClick={() => {
              setLogin(true);
              setLoginError("");
            }}
            type="submit"
            sx={{
              background: "linear-gradient(to right, #5c6bc0, #512da8)",
              color: "white",
              borderRadius: "25px",
              fontWeight: 600,
              textTransform: "uppercase",
              width: "100px",
            }}
          >
            LOGIN
          </Button>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default Login;
