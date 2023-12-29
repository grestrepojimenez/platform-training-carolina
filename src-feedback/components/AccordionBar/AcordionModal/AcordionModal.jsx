/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AcordionModal = () => {
  // Obtener datos del localStorage al renderizar el componente
  const storedData =
    JSON.parse(localStorage.getItem("dataRoutineFinished")) || [];

  // Obtener la última entrada del arreglo (si existe)
  const lastEntry = storedData[storedData.length - 1];

  return (
    <div className="flex justify-center mb-5">
      <Accordion className="bg-black text-white text-xs tracking-wider w-96">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-red" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-sm">Ejercicios Realizados</p>
        </AccordionSummary>

        <AccordionDetails>
          {lastEntry && lastEntry.exerciseCount ? (
            <div className="space-y-2">
              {lastEntry.exerciseCount.map((exercise, index) => (
                <Card key={index} className="bg-grey w-80 h-36">
                  <CardContent className="relative">
                    <div>
                      <div className="flex">
                        <div className="relative flex pb-5">
                          <img
                            className="w-16 rounded cursor-zoom-in mt-1"
                            src={exercise.images}
                            alt={`Exercise: ${exercise.name}`}
                          />
                        </div>
                        <div className="text-white capitalize text-xs mt-1 mx-5 ">
                          <h2>{exercise.name}</h2>
                          <p className="mt-3 text-red">{exercise.primaryMuscles}</p>
                        </div>
                      </div>

                      <hr />

                      <div className="flex space-x-8 mt-2">
                        <div className="flex space-x-1">
                          <i className="bx bx-list-ul text-red text-base" />
                          <p className="text-white mt-1">
                            {exercise.selectedSeries} Set
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <i className="bx bx-repeat text-red text-base" />
                          <p className="text-white mt-1">
                            {exercise.numberRepetitions} Rep
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <i className="bx bx-dumbbell text-red text-base" />
                          <p className="text-white mt-1">
                            {exercise.weightLoad} Lib
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No hay ejercicios disponibles</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AcordionModal;
