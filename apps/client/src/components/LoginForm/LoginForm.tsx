import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useMutation } from "react-query";
import { authAPI } from "../../services/authAPI";
import { LoginData } from "../../services/dto.types";

import { fetchInstance } from "../../services/fetchInstance";

type LoginFormProps = {
  setToken: (token: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isError, isLoading, mutateAsync } = useMutation((data: LoginData) =>
    authAPI.login(data)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    const { token } = await mutateAsync(data);
    localStorage.setItem("token", token);
    fetchInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setToken(token);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        widows: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          bgcolor: "#a4daf0",
          padding: 2,
          width: "100%",
        }}
        borderRadius={1}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" component="h3" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <FormControl sx={{ width: "100%", margin: 0 }} variant="outlined">
          <TextField
            {...register("email", { required: "Email is required" })}
            label="Email"
            type="email"
            error={!!errors.email}
            margin="normal"
            sx={{ width: "100%", margin: 0 }}
          />
          {errors.email && typeof errors.email.message === "string" && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ width: "100%", margin: 0 }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            {...register("password", { required: "Password is required" })}
            id="password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password && typeof errors.password.message === "string" && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {isError && (
          <Typography variant="subtitle2" color="error" align="center">
            Incorrect email or password
          </Typography>
        )}
      </Box>
    </Box>
  );
};
