import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useInputContext } from "../../hooks/useInputContext";
import InputsBar from "../../components/InputsBar/InputsBar";
import FloatingButtons from "../../components/Buttons/FolatingButtons/FloatingButtons";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import SnackBarCustom from "../../components/SnackBarCustom/SnackBarCustom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { handleInputChange } = useInputContext();
  const methods = useForm();
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    // Obtener los datos del usuario almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Encontrar el usuario por correo electrónico
    const user = storedUsers.find(
      (storedUser) => storedUser.email === data.email
    );

    if (user && user.password === data.password) {
      // Credenciales válidas, redirigir a la página deseada
      handleInputChange("name", user.name);
      navigate("/createTrainingPage");
      methods.reset();
    } else {
      // Credenciales inválidas, mostrar un mensaje de error
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="w-60 ">
        <div className="flex justify-between">
          <FloatingButtons
            variant="outlined"
            icon={<i className="bx bxl-facebook text-2xl" />}
          />
          <FloatingButtons variant="outlined" icon={<InstagramIcon />} />
          <FloatingButtons variant="outlined" icon={<GoogleIcon />} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mt-5">
              <InputsBar
                className="mb-8"
                icon={<MailOutlineIcon />}
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
                contextType="user"
              />
              <InputsBar
                icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                id="password"
                label="Password"
                name="password"
                onClick={(e) => {
                  e.preventDefault();
                  handlePasswordVisibility();
                }}
                type={showPassword ? "text" : "password"}
                onChange={(e) => handleInputChange("password", e.target.value)}
                contextType="user"
              />
            </div>

            <div className="xl:mt-20 mt-10 ">
              <p className="text-xs flex justify-center my-5 hover:text-red tracking-wider cursor-pointer">
                ¿Olvidaste tu contraseña?
              </p>
              <div className="flex justify-center">
                <BasicButtons
                  title="Iniciar Sesión"
                  type="submit"
                  variant="contained"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <SnackBarCustom
        open={snackbarOpen} // Pass open state as prop
        onClose={handleCloseSnackbar} // Pass close function as prop
        severity="error"
        message="¡Error de inicio de sesión! Verifica correo y contraseña"
      />
    </>
  );
};

export default Login;
