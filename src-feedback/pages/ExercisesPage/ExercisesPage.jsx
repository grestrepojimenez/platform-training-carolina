/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";

import NavBar from "../../layout/NavBar/NavBar";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import MenuBar from "../../components/MenuBar/MenuBar";
import exercisesData from "../../__mocks__/exercisesData.json";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import ReturnButton from "../../components/Buttons/ReturnButton/ReturnButton";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";

const ExercisesPage = () => {
  const { routineData } = useRoutineContext();
  const { routineName } = useParams();
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
      <div>
        <BannerNavBar />
      </div>

      <div className="justify-center relative">
        <div className="mx-auto text-center">
          <p className="uppercase mb-5 text-red font-medium mt-14 tracking-wider text-xl lg:text-2xl ">
            Rutina - {nameRoutine.routineName}
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
          <div className="mx-auto flex flex-wrap justify-center lg:justify-start lg:ml-52">
            {/* Mapeo de los datos de exercisesData a las tarjetas CardExercises */}
            {filteredExercises.map((exercise) => (
              <CardExercises
                key={exercise.id}
                exercise={exercise}
                icon={<AddCircleIcon />}
                routineName={nameRoutine.routineName}
              />
            ))}
          </div>
        </div>

        <ScrollButton />
        <div className="pb-24">
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default ExercisesPage;
