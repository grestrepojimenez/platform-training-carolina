/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

// hook personalizado para acceder a los valores de RoutineContext.
const RoutineContext = createContext();

// Función personalizada que devuelve el valor del contexto.
export const useRoutineContext = () => {
  return useContext(RoutineContext);
};

// Proveedor de contexto que administra el estado de los input y proporciona el contexto a los componentes hijos.
export const RoutineProvider = ({ children }) => {
  const [routineData, setRoutineData] = useState({
    routines: {},
  });
  const [trainingCount, setTrainingCount] = useState(0); // Contador de entrenamientos

  // Función para actualizar inputData según el campo y el valor
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
  };

  // Función para incrementar el contador si el nombre del entrenamiento existe
  const updateTrainingCount = (routineName) => {
    const routine = routineData.routines[routineName];
    if (routine) {
      setTrainingCount(routine.exercises.length);
    }
  };

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

  useEffect(() => {
    // Guardar routineData en localStorage
    localStorage.setItem("routineData", JSON.stringify(routineData));
  }, [routineData]);

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
