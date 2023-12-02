import { useParams } from "react-router-dom";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import StepperTraining from "../../components/StepperTraining/StepperTraining";
import NavBar from "../../layout/NavBar/NavBar";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";

const RoutinePage = () => {
  const { routineName } = useParams();
  const { routineData } = useRoutineContext();

  // Buscar la rutina por el nombre proporcionado en los parámetros
  const selectedRoutine = Object.values(routineData.routines).find(
    (routine) => routine.routineName === routineName
  );

  let exerciseCount = 0;
  if (selectedRoutine) {
    exerciseCount = selectedRoutine.exercises.length;
  }

  // Acceder a la informacion dentro del hook useRoutineContext()
  const nameRoutine = Object.values(routineData.routines)[
    Object.values(routineData.routines).length - 1
  ];

  return (
    <>
      <BannerNavBar />
      <div className="justify-center relative mt-8">
        <div className="mx-auto text-center mb-3 tracking-wide ">
          <p className=" text-red tracking-wider text-xl lg:text-2xl font-medium uppercase mb-2">
            Entrenamiento
          </p>
          <p className="text-lg">Rutina - {nameRoutine.routineName}</p>
        </div>

        <div className="mx-auto">
          <StepperTraining
            exerciseCount={exerciseCount}
            selectedRoutine={selectedRoutine}
          />
        </div>

        <div className="pb-24">
          <NavBar />
        </div>
        <ScrollButton />
      </div>
    </>
  );
};

export default RoutinePage;
