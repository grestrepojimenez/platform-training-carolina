import { Link, useParams } from "react-router-dom";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import StepperTraining from "../../components/StepperTraining/StepperTraining";
import NavBar from "../../layout/NavBar/NavBar";
import ReturnButton from "../../components/Buttons/ReturnButton/ReturnButton";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";

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
    <div className="justify-center relative">
      <div className="absolute -mt-14 md:mt-2 md:ml-8 ml-3">
        <Link to="/trainingPlanPage">
          <ReturnButton />
        </Link>
      </div>

      <div className="mx-auto text-center mb-3 tracking-wide ">
        <p className="uppercase mb-5 text-red mt-20 md:mt-14 text-center text-xl">
          Tu Entrenamiento
        </p>
        <p className="text-lg">
          Rutina - {/* {nameRoutine.routineName} */}
        </p>        
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
  );
};

export default RoutinePage;
