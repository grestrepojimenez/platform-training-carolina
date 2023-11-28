import { Link, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";

import { useRoutineContext } from "../../hooks/useRoutineContext";
import { useInputContext } from "../../hooks/useInputContext";
import NavBar from "../../layout/NavBar/NavBar";
import ReturnButton from "../../components/Buttons/ReturnButton/ReturnButton";
import CardTraining from "../../components/Cards/CardTraining/CardTraining";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";

const TrainingStartPage = () => {
  const { routineName } = useParams();
  const { routineData, removeExercise } = useRoutineContext();
  const { inputData } = useInputContext();

  // Buscar la rutina por el nombre proporcionado en los parámetros
  const selectedRoutine = Object.values(routineData.routines).find(
    (routine) => routine.routineName === routineName
  );

  // Calculando la suma de los tiempos promedio de los ejercicios
  let totalAverageDuration = 0;

  if (selectedRoutine) {
    selectedRoutine.exercises.forEach((exercise) => {
      totalAverageDuration += exercise.averageDuration;
    });
  }

  return (
    <>
      <div>
        <Link to="/trainingPlanPage">
          <ReturnButton />
        </Link>
        {selectedRoutine ? (
          <div>
            <div className="text-center tracking-wider">
              <div className="flex items-center justify-center text-red mb-2 mt-10 tracking-wider">
                <h2 className="text-2xl">¡ Hola ! {inputData.name}</h2>
                <i className="bx bx-dumbbell bx-tada text-2xl ml-2" />
              </div>

              <p>Comencemos a entrenar</p>

              <h2 className=" mb-10 text-red font-medium mt-10 text-lg ">
                Rutina {selectedRoutine.routineName}
              </h2>
            </div>

            <div className="flex justify-between md:justify-evenly px-8 mb-10">
              <div className="w-32">
                <p className="pb-2">Tiempo Promedio</p>

                <div className="flex justify-between text-red">
                  <i className="bx bx-timer text-lg" />
                  <p className="text-base">{totalAverageDuration} min</p>
                </div>

                <hr className="border-b border-redOpacity w-full my-1" />
              </div>

              <div>
                <Tooltip title="Play rutina">
                  <IconButton color="error" aria-label="Play rutina">
                    <i className="bx bx-play" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="flex mt-10 md:mt-0">
              <div className="mx-auto flex flex-wrap justify-center lg:justify-start lg:ml-52">
                {selectedRoutine.exercises.map((exercise, index) => (
                  <CardTraining
                    key={exercise.id}
                    name={exercise.name}
                    primaryMuscles={exercise.primaryMuscles}
                    equipment={exercise.equipment}
                    images={exercise.images}
                    set={exercise.selectedSeries}
                    rep={exercise.numberRepetitions}
                    lib={exercise.weightLoad}
                    exerciseNumber={index + 1}
                    icon={<i className="bx bx-trash" />}
                    onClick={() =>
                      removeExercise(selectedRoutine.routineName, exercise.id)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Rutina no encontrada</div>
        )}

        <Link to="/exercisesPage">
          <div className="flex justify-center mt-10">
            <BasicButtons title="Agregar Ejercicio" variant="outlined" />
          </div>
        </Link>

        <NavBar />
      </div>
    </>
  );
};

export default TrainingStartPage;
