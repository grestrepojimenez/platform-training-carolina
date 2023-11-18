import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useInputContext } from "../../hooks/useInputContext";

import { Alert, Snackbar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import FloatingButtons from "../../components/Buttons/FolatingButtons/FloatingButtons";
import InputsBar from "../../components/InputsBar/InputsBar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { handleInputChange } = useInputContext();
  const methods = useForm();
  const navigate = useNavigate();

  // Función para alternar la visibilidad de la contraseña
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    // Obtener usuarios almacenados en el localStorage (si existen)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Crear un nuevo objeto de usuario con los datos del formulario
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // Agregar el nuevo usuario al arreglo de usuarios almacenados
    storedUsers.push(newUser);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("users", JSON.stringify(storedUsers));

    methods.reset();
    // Redirigir a la página de creación de entrenamiento
    navigate("/registerPage");
    setSnackbarOpen(true);
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

        {/* Formulario de registro */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mt-5">
              <InputsBar
                id="name"
                label="Nombre"
                type="name"
                name="name"
                icon={<PersonIcon />}
                className="mb-4"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <InputsBar
                id="email"
                label="Email"
                type="email"
                name="email"
                icon={<MailOutlineIcon />}
                className="mb-4"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <InputsBar
                id="password"
                label="Crear Password"
                name="password"
                type={showPassword ? "text" : "password"}
                icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={handlePasswordVisibility}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>

            {/* Botón de registro */}
            <div className="xl:mt-16 mt-10 flex justify-center">
              <BasicButtons
                title="Registarse"
                type="submit"
                variant="contained"
              />
            </div>
          </form>
        </FormProvider>
      </div>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
          >
            ¡OK Información enviada!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Register;
