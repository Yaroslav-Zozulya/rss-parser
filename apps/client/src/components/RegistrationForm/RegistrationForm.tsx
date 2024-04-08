import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../../schemas/registerFormSchema";
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
import { useMutation, useQueryClient } from "react-query";
import { authAPI } from "../../services/authAPI";
import { AdminUserData } from "../../services/dto.types";

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isError, isLoading, mutateAsync } = useMutation(
    (data: AdminUserData) => authAPI.registerAdmin(data)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUserData>({ resolver: zodResolver(registerFormSchema) });

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<AdminUserData> = async (
    data: AdminUserData
  ) => {
    try {
      await mutateAsync(data);
      queryClient.refetchQueries("isAdminUser");
    } catch (error) {
      console.log("Here must be some notify");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
          Registration
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
        <FormControl sx={{ width: "100%", margin: 0 }} variant="outlined">
          <InputLabel htmlFor="confirmPassword">Password</InputLabel>
          <OutlinedInput
            {...register("confirmPassword", {
              required: "Password is required",
            })}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            error={!!errors.confirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.confirmPassword &&
            typeof errors.confirmPassword.message === "string" && (
              <FormHelperText error>
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Loading..." : "Registration"}
        </Button>
        {isError && (
          <Typography variant="subtitle2" color="error" align="center">
            Something is wrong. Try again please
          </Typography>
        )}
      </Box>
    </Box>
  );
};
