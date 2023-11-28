import { Link } from "react-router-dom";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import NavBar from "../../layout/NavBar/NavBar";
import CardPlanName from "../../components/Cards/CardPlanName/CardPlanName";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import ReturnButton from "../../components/Buttons/ReturnButton/ReturnButton";

const TrainingPlanPage = () => {
  const { routineData } = useRoutineContext();
  // Acceder a la información dentro del hook useRoutineContext()
  const routinesArray = Object.values(routineData.routines);

  return (
    <>
      <div className="justify-center relative overflow-y-auto max-h-screen">
        <div className="absolute mt-6 md:mt-2 md:ml-8 ml-3">
          <Link to="/exercisesPage">
            <ReturnButton />
          </Link>
        </div>

        <div className="tracking-wider mx-auto text-center">
          <h2 className=" text-red font-medium uppercase mt-14 ">
            Planes Entrenamiento
          </h2>
          <p className="p-6">Selecciona Entrenamiento</p>
        </div>

        <div className="flex mt-0 md:mt-0">
          <div className="mx-auto flex flex-wrap justify-center lg:justify-start lg:ml-52">
            {routinesArray.map(
              (routine, index) =>
                routine.routineName &&
                typeof routine.routineName === "string" && (
                  <CardPlanName key={index} routineName={routine.routineName} />
                )
            )}
          </div>
        </div>

        <ScrollButton />
        <NavBar />
      </div>
    </>
  );
};

export default TrainingPlanPage;
