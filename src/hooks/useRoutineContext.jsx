/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Contexto para almacenar y proporcionar datos de rutinas de ejercicio a los componentes hijos.
const RoutineContext = createContext();

// Hook personalizado para acceder al contexto de las rutinas de ejercicio.
export const useRoutineContext = () => {
  return useContext(RoutineContext);
};

// Proveedor de contexto que administra el estado de las rutinas de ejercicio y proporciona funciones para manipular los datos.
export const RoutineProvider = ({ children }) => {
  // Estado local para almacenar datos de rutinas y el contador de entrenamientos.
  const [routineData, setRoutineData] = useState({
    routines: {},
  });
  const [trainingCount, setTrainingCount] = useState(0); // Contador de entrenamientos

  // Función para actualizar datos de una rutina y guardarlos en el localStorage.
  const handleRoutineInputChange = (routineName, field, value) => {
    setRoutineData((prevData) => ({
      ...prevData,
      routines: {
        ...prevData.routines,
        [routineName]: {
          ...prevData.routines[routineName],
          [field]: value,
        },
      },
    }));

    // Crear o actualizar el objeto de la rutina en el localStorage
    const updatedRoutineData = {
      ...routineData,
      routines: {
        ...routineData.routines,
        [routineName]: {
          ...routineData.routines[routineName],
          [field]: value,
        },
      },
    };

    setRoutineData(updatedRoutineData);
    localStorage.setItem("routineData", JSON.stringify(updatedRoutineData));
  };

  // Función para actualizar el contador de entrenamientos si existe la rutina.
  const updateTrainingCount = (routineName) => {
    const routine = routineData.routines[routineName];
    if (routine) {
      setTrainingCount(routine.exercises.length);
    }
  };
  // Función para agregar una nueva rutina.
  const addRoutine = (routineName) => {
    setRoutineData((prevData) => ({
      ...prevData,
      routines: {
        ...prevData.routines,
        [routineName]: {
          routineName,
          exercises: [],
        },
      },
    }));
  };
  // Función para agregar un ejercicio a una rutina específica.
  const addExerciseToRoutine = (routineName, exerciseData) => {
    setRoutineData((prevData) => {
      const targetRoutine = prevData.routines[routineName];
      if (targetRoutine && targetRoutine.exercises) {
        return {
          ...prevData,
          routines: {
            ...prevData.routines,
            [routineName]: {
              ...targetRoutine,
              exercises: [...targetRoutine.exercises, exerciseData],
            },
          },
        };
      }
      // Manejar el caso en que el objetivo no exista o no tenga ejercicios definidos
      return prevData;
    });
  };
  // Función para eliminar una rutina.
  const removeRoutine = (routineName) => {
    setRoutineData((prevData) => {
      const updatedRoutines = { ...prevData.routines };
      delete updatedRoutines[routineName];
      return {
        ...prevData,
        routines: updatedRoutines,
      };
    });

    // Remove routine data from localStorage
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};
    delete storedRoutineData[routineName];
    localStorage.setItem("routineData", JSON.stringify(storedRoutineData));
  };
  // Proporcionar el contexto con los datos y funciones a los componentes hijos.
  return (
    <RoutineContext.Provider
      value={{
        routineData,
        handleRoutineInputChange,
        trainingCount,
        updateTrainingCount,
        addRoutine,
        addExerciseToRoutine,
        removeRoutine,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};
