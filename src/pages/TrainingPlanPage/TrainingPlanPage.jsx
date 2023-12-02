import { useRoutineContext } from "../../hooks/useRoutineContext";
import NavBar from "../../layout/NavBar/NavBar";
import CardPlanName from "../../components/Cards/CardPlanName/CardPlanName";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";

import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import { Link } from "react-router-dom";

const TrainingPlanPage = () => {
  const { routineData } = useRoutineContext();
  // Acceder a la información dentro del hook useRoutineContext()
  const routinesArray = routineData?.routines
    ? Object.values(routineData.routines)
    : [];

  return (
    <>
      <div>
        <BannerNavBar />
      </div>

      <div className="justify-center relative overflow-y-auto max-h-screen">
        <div className="tracking-wider mx-auto text-center mt-14">
          <h2 className="text-red tracking-wider text-xl lg:text-2xl font-medium uppercase mb-2">
            Rutinas Entrenamiento
          </h2>
          {routinesArray.length === 0 && (
            <>
              <div className="mt-20">
                <p className="p-6">No hay rutinas disponibles</p>
                <Link to="/createTrainingPage">
                  <BasicButtons title="Generar Rutina" variant="contained" />
                </Link>
              </div>
            </>
          )}
        </div>

        {routinesArray.length > 0 && (
          <div className="flex mt-12">
            <div className="mx-auto flex flex-wrap justify-center">
              {routinesArray.map(
                (routine, index) =>
                  routine.routineName &&
                  typeof routine.routineName === "string" && (
                    <CardPlanName
                      key={index}
                      routineName={routine.routineName}
                    />
                  )
              )}
            </div>
          </div>
        )}

        <ScrollButton />
        <div className="pb-24">
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default TrainingPlanPage;
