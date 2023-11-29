import { Link, useParams } from "react-router-dom";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import StepperTraining from "../../components/StepperTraining/StepperTraining";
import NavBar from "../../layout/NavBar/NavBar";
import ReturnButton from "../../components/Buttons/ReturnButton/ReturnButton";

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
      <div className="absolute md:mt-2 md:ml-8 ml-3">
        <Link to="/trainingPlanPage">
          <ReturnButton />
        </Link>
      </div>

      <div className="mx-auto text-center mb-10">
        <p className="uppercase mb-5 text-red font-medium mt-14 tracking-widest lg:mt-0 text-center">
          Rutina -{/*  {nameRoutine.routineName} */}
        </p>        
        <div>Timer</div>
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
    </div>
  );
};

export default RoutinePage;
