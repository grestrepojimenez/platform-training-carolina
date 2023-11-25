/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NavBar from "../../layout/NavBar/NavBar";
import { useInputContext } from "../../hooks/useInputContext";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import MenuBar from "../../components/MenuBar/MenuBar";
import exercisesData from "../../__mocks__/exercisesData.json";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";

const ExercisesPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto
  const { routineData } = useRoutineContext();
  const [filteredExercises, setFilteredExercises] = useState(exercisesData);

  // Obtener datos únicos de "equipment" y "primaryMuscles" del JSON
  const musclesData = [
    ...new Set(exercisesData.flatMap((exercise) => exercise.primaryMuscles)),
  ];
  const equipmentData = [
    ...new Set(exercisesData.flatMap((exercise) => exercise.equipment)),
  ];

  // Acceder a la informacion dentro del hook useRoutineContext()
  const nameRoutine = Object.values(routineData.routines)[
    Object.values(routineData.routines).length - 1
  ];

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="justify-center relative">
        <div className="absolute md:mt-2 md:ml-8 ml-3">
          <Link to="/createTrainingPage">
            <IconButton color="error">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>

        <div className="mx-auto text-center">
          <p className="uppercase mb-5 text-red text-xl font-medium mt-28">
            Rutina {nameRoutine.routineName}
          </p>
          <p className="capitalize tracking-wider text-center text-red mb-5">
            ¡ Hola ! {inputData.name}
          </p>
          <p>Selecciona los ejercicios para la rutina</p>
        </div>

        <div className="flex justify-center mt-10 md:m-10 md:space-x-4 space-x-2">
          <MenuBar
            title="filtrar musculo"
            list={musclesData}
            exercisesData={exercisesData}
            setFilteredExercises={setFilteredExercises}
          />
          <MenuBar
            title="filtrar equipo"
            list={equipmentData}
            exercisesData={exercisesData}
            setFilteredExercises={setFilteredExercises}
          />
        </div>

        <div className="flex mt-8 md:mt-0">
          <div className="max-w-screen-lg mx-auto flex flex-wrap justify-center">
            {/* Mapeo de los datos de exercisesData a las tarjetas CardExercises */}
            {filteredExercises.map((exercise) => (
              <CardExercises
                key={exercise.id}
                exercise={exercise}
                icon={<AddCircleIcon />}
              />
            ))}
          </div>
        </div>
        <ScrollButton />
      </main>
    </>
  );
};

export default ExercisesPage;
