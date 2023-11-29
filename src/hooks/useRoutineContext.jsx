/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RoutineContext = createContext();

export const useRoutineContext = () => {
  return useContext(RoutineContext);
};

export const RoutineProvider = ({ children }) => {
  const [routineData, setRoutineData] = useState({ routines: {} });
  const [trainingCount, setTrainingCount] = useState(0);

  useEffect(() => {
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};
    setRoutineData(storedRoutineData);
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("routineData", JSON.stringify(data));
  };

  const handleRoutineInputChange = (routineName, field, value) => {
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
    updateLocalStorage(updatedRoutineData);
  };

  const addRoutine = (routineName, exercises = []) => {
    const idRoutine = uuidv4();
    const updatedRoutineData = {
      ...routineData,
      routines: {
        ...routineData.routines,
        [routineName]: {
          routineName,
          exercises,
          idRoutine,
        },
      },
    };

    setRoutineData(updatedRoutineData);
    updateLocalStorage(updatedRoutineData);
  };

  const addExerciseToRoutine = (routineName, newExercise) => {
    const updatedRoutineData = {
      ...routineData,
      routines: {
        ...routineData.routines,
        [routineName]: {
          ...routineData.routines[routineName],
          exercises: [
            ...(routineData.routines[routineName]?.exercises || []), // Maintain existing exercises
            newExercise, // Add the new exercise
          ],
        },
      },
    };

    setRoutineData(updatedRoutineData);
    updateLocalStorage(updatedRoutineData);
  };


  const removeRoutine = (routineName) => {
    const updatedRoutines = { ...routineData.routines };
    delete updatedRoutines[routineName];

    const updatedRoutineData = {
      ...routineData,
      routines: updatedRoutines,
    };

    setRoutineData(updatedRoutineData);
    updateLocalStorage(updatedRoutineData);
  };

  const removeExercise = (routineName, exerciseId) => {
    const updatedRoutineData = {
      ...routineData,
      routines: {
        ...routineData.routines,
        [routineName]: {
          ...routineData.routines[routineName],
          exercises: routineData.routines[routineName].exercises.filter(
            (exercise) => exercise.id !== exerciseId
          ),
        },
      },
    };

    setRoutineData(updatedRoutineData);
    updateLocalStorage(updatedRoutineData);
  };

  const updateTrainingCount = (routineName) => {
    const routine = routineData.routines[routineName];
    if (routine) {
      setTrainingCount(routine.exercises.length);
    }
  };

  return (
    <RoutineContext.Provider
      value={{
        routineData,
        handleRoutineInputChange,
        trainingCount,
        updateTrainingCount,
        addRoutine,
        removeRoutine,
        removeExercise,
        addExerciseToRoutine, 
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};
