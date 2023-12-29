import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Permitir modificar los estilos propios y dejar los de material en segundo plano
import { StyledEngineProvider } from "@mui/material";
// Importar todos los provider de la aplicacion
import { InputProvider } from "./hooks/useInputContext.jsx";
import { AvatarProvider } from "./hooks/useAvatarContext.jsx";
import { RoutineProvider } from "./hooks/useRoutineContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InputProvider>
      <AvatarProvider>
        <RoutineProvider>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </RoutineProvider>
      </AvatarProvider>
    </InputProvider>
  </React.StrictMode>
);
