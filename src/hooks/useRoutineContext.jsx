/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// hook personalizado para acceder a los valores de RoutineContext.
const RoutineContext = createContext();

// Función personalizada que devuelve el valor del contexto.
export const useRoutineContext = () => useContext(RoutineContext);

// Proveedor de contexto que administra el estado de los input y proporciona el contexto a los componentes hijos.
export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]); // Arreglo de rutinas
  const [routineData, setRoutineData] = useState({
    routineName: "",
    seriesNumber: "",
    numberRepetitions: "",
    weightLoad: "",
    averageDuration: "",
    instructions: "",
  });

  const [trainingCount, setTrainingCount] = useState(0); // Contador de entrenamientos

  // Función para actualizar inputData según el campo y el valor
  const handleInputChange = (field, value) => {
    setRoutineData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Función para incrementar el contador si el nombre del entrenamiento existe
  const updateTrainingCount = (name) => {
    setTrainingCount(0);
    // Aquí deberías recorrer todas las rutinas para encontrar la que coincida con el nombre y luego contar los ejercicios en esa rutina
    routines.forEach((routine) => {
      if (routine.routineName === name) {
        setTrainingCount(routine.exercises.length);
      }
    });
  };

  const addRoutine = (routineName) => {
    const newRoutine = {
      routineName: routineName,
      exercises: [], // Aquí puedes almacenar los ejercicios de la rutina
    };
    setRoutines([...routines, newRoutine]);
  };

  const addExerciseToRoutine = (routineName, exerciseData) => {
    const updatedRoutines = routines.map((routine) => {
      if (routine.routineName === routineName) {
        return {
          ...routine,
          exercises: [...routine.exercises, exerciseData],
        };
      }
      return routine;
    });
    setRoutines(updatedRoutines);
  };

  const removeRoutine = (routineName) => {
    const updatedRoutines = routines.filter(
      (routine) => routine.routineName !== routineName
    );
    setRoutines(updatedRoutines);

    // Remove routine data from localStorage
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};
    delete storedRoutineData[routineName];
    localStorage.setItem("routineData", JSON.stringify(storedRoutineData));
  };

  return (
    <RoutineContext.Provider
      value={{
        routineData,
        handleInputChange,
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
