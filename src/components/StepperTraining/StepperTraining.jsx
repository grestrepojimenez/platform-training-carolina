/* eslint-disable react/prop-types */
import { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";
import CardTraining from "../Cards/CardTraining/CardTraining";
import "./StepperTraining.css";
import AccordionBar from "../AccordionBar/AccordionBar";
import CardCheckbox from "../Cards/CardCheckbox/CardCheckbox";

const StepperTraining = ({ exerciseCount, selectedRoutine }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          <div>
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
                      {Array.from(
                        {
                          length:
                            selectedRoutine.exercises[activeStep]
                              .selectedSeries,
                        },
                        (_, index) => (
                          <div key={index}>
                            <CardCheckbox
                              set={index + 1}
                              rep={
                                selectedRoutine.exercises[activeStep]
                                  .numberRepetitions
                              }
                              lib={
                                selectedRoutine.exercises[activeStep].weightLoad
                              }
                            />
                          </div>
                        )
                      )}
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
                onClick={handleNext}
                icon={<i className="bx bx-check" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepperTraining;
