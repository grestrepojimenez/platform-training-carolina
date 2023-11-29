/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";
import CardTraining from "../Cards/CardTraining/CardTraining";
import "./StepperTraining.css";
import AccordionBar from "../AccordionBar/AccordionBar";
import CardCheck from "../Cards/CardCheck/CardCheck";
import SnackBarCustom from "../SnackBarCustom/SnackBarCustom";

const StepperTraining = ({ exerciseCount, selectedRoutine }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardChecksStatus, setCardChecksStatus] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (selectedRoutine && selectedRoutine.exercises) {
      // Al cambiar de paso, resetea el estado de las CardCheck
      setCardChecksStatus(
        Array(selectedRoutine.exercises[activeStep].selectedSeries).fill(false)
      );
    }
  }, [activeStep, selectedRoutine]);

  const handleCardCheckClick = (index) => {
    const updatedStatus = [...cardChecksStatus];
    updatedStatus[index] = !updatedStatus[index];
    setCardChecksStatus(updatedStatus);
  };

  const handleNext = () => {
    // Verifica si todas las CardCheck están marcadas antes de avanzar al siguiente paso
    const allChecked = cardChecksStatus.every((status) => status);
    if (allChecked) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div className="mb-10">
        <Stepper activeStep={activeStep} alternativeLabel>
          {Array.from({ length: exerciseCount }, (_, index) => (
            <Step key={index + 1}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="flex justify-center">
        {activeStep === exerciseCount ? (
          <div className="mx-auto">
            <p>¡Has completado todos los pasos!</p>
            <BasicButtons
              title="Reiniciar"
              variant="contained"
              onClick={handleReset}
            />
          </div>
        ) : (
          <div>
            {/* Contenido del paso */}
            <div>
              {/* Contenido específico de cada paso */}
              {selectedRoutine && (
                <div>
                  <div className="mb-1">
                    <CardTraining
                      name={selectedRoutine.exercises[activeStep].name}
                      primaryMuscles={
                        selectedRoutine.exercises[activeStep].primaryMuscles
                      }
                      equipment={
                        selectedRoutine.exercises[activeStep].equipment
                      }
                      images={selectedRoutine.exercises[activeStep].images}
                      exerciseNumber={activeStep + 1}
                    />
                  </div>

                  <div>
                    <AccordionBar
                      instructions={
                        selectedRoutine.exercises[activeStep].instructions
                      }
                    />
                  </div>

                  <div>
                    <div className="mt-5 space-y-4">
                      {cardChecksStatus.map((checked, index) => (
                        <div
                          key={index}
                          onClick={() => handleCardCheckClick(index)}
                        >
                          <CardCheck
                            set={index + 1}
                            rep={
                              selectedRoutine.exercises[activeStep]
                                .numberRepetitions
                            }
                            lib={
                              selectedRoutine.exercises[activeStep].weightLoad
                            }
                            isChecked={checked}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-5">
              <BasicButtons
                title="Atras"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                icon={<i className="bx bx-arrow-back" />}
              />
              <BasicButtons
                title={
                  activeStep === exerciseCount - 1 ? "Finalizar" : "Ok Set"
                }
                variant="contained"
                onClick={() => {
                  handleNext();
                }}
                icon={<i className="bx bx-check" />}
              />
            </div>
          </div>
        )}
      </div>
      <SnackBarCustom
        open={snackbarOpen} // Pass open state as prop
        onClose={handleCloseSnackbar} // Pass close function as prop
        severity="warning"
        message="¡Completa todos los ejercicios, marca cada set!"
      />
    </div>
  );
};

export default StepperTraining;
