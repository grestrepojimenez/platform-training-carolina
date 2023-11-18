/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
// Se crea un contexto para manejar el estado de las pestañas en la aplicación.
const TabsContext = createContext();

// Función personalizada que devuelve el valor del contexto de las pestañas.
export const useTabsContext = () => {
  return useContext(TabsContext);
};

// Proveedor de contexto que administra el estado de las pestañas y proporciona el contexto a los componentes hijos.
export const TabsProvider = ({ children }) => {
  // Estado local que almacena el índice de la pestaña seleccionada.
  const [value, setValue] = useState(0);

  // Función para cambiar el valor de la pestaña seleccionada.
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Se define el valor del contexto que se compartirá con los componentes hijos.
  const contextValue = {
    value, // Valor actual de la pestaña seleccionada.
    handleChange, // Función para cambiar la pestaña seleccionada.
  };

  // Se proporciona el contexto a los componentes hijos utilizando TabsContext.Provider.
  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
