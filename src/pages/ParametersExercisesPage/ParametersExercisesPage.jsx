/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import NavBar from "../../layout/NavBar/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRoutineContext } from "../../hooks/useRoutineContext";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";
import InputsBar from "../../components/InputsBar/InputsBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";

const ParametersExercisesPage = () => {
  const location = useLocation();
  const {
    routineData,
    trainingCount,
    updateTrainingCount,
    addExerciseToRoutine,
    handleRoutineInputChange,
  } = useRoutineContext();

  const methods = useForm();
  const navigate = useNavigate();
  const { reset } = methods;
  const { exerciseData } = location.state;
  const { instructions } = exerciseData;

  // Asegúrese de que los datos de ejercicio existan antes de renderizar
  if (!exerciseData) {
    return (
      <div>
        <h2>¡No se encontraron datos de ejercicio!</h2>
      </div>
    );
  }

  useEffect(() => {
    updateTrainingCount(routineData.routineName);
  }, [routineData.routineName, updateTrainingCount]);

  const onSubmit = (data) => {
    const exerciseWithParams = {
      ...data,
      ...exerciseData,
    };
    addExerciseToRoutine(routineData.routineName, exerciseWithParams);
    reset();
    navigate("/trainingPlanPage");
  };

  const handleInputChange = (field, value) => {
    handleRoutineInputChange(routineData.routineName, field, value);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="justify-center relative">
        <div className="m-3 mt-20">
          <Link to="/exercisesPage">
            <IconButton color="error">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>

        <div>
          <h2 className="tracking-wide mb-5 font-medium mt-5 text-center">
            <p className="uppercase mb-5 text-red text-xl font-medium">
              Rutina {routineData.routineName}
            </p>
            Ejercicio {trainingCount + 1}
          </h2>

          <div className="flex justify-center mb-5">
            <CardExercises exercise={exerciseData} />
          </div>

          <div className="justify-center text-center">
            <p className="m-5">Definir parametros de entrenamiento</p>
            <div className="w-96 mx-auto">
              {/* Formulario de parametros ejercicios */}
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="mt-5">
                    <InputsBar
                      id="seriesNumber"
                      label="Numero de Series"
                      type="number"
                      name="seriesNumber"
                      icon={<i className="bx bx-list-ul" />}
                      className="mb-4"
                      onChange={(e) =>
                        handleInputChange("seriesNumber", e.target.value)
                      }
                      contextType="routine"
                    />
                    <InputsBar
                      id="numberRepetitions"
                      label="Numero de Rep"
                      type="number"
                      name="numberRepetitions"
                      icon={<i className="bx bx-repeat" />}
                      className="mb-4"
                      onChange={(e) =>
                        handleInputChange("numberRepetitions", e.target.value)
                      }
                      contextType="routine"
                    />
                    <InputsBar
                      id="weightLoad"
                      label="Peso a cargar (Kg)"
                      type="number"
                      name="weightLoad"
                      icon={<i className="bx bx-dumbbell" />}
                      className="mb-4"
                      onChange={(e) =>
                        handleInputChange("weightLoad", e.target.value)
                      }
                      contextType="routine"
                    />
                    <InputsBar
                      id="averageDuration"
                      label="Duracion Prom (min)"
                      type="number"
                      name="averageDuration"
                      icon={<i className="bx bx-timer" />}
                      className="mb-4"
                      onChange={(e) =>
                        handleInputChange("averageDuration", e.target.value)
                      }
                      contextType="routine"
                    />
                    <InputsBar
                      id="instructions"
                      label="Observaciones"
                      type="text"
                      name="instructions"
                      icon={<i className="bx bx-file" />}
                      className="mb-4 overflow-hidden w-60"
                      onChange={(e) =>
                        handleInputChange("instructions", e.target.value)
                      }
                      maxRows={50}
                      isMultiline={true}
                      contextType="routine"
                    />
                    <p className="text-sm tracking-wide p-5 text-justify">
                      {instructions}
                    </p>
                  </div>
                  <div className="md:flex mt-5 mb-16">
                    <BasicButtons
                      title="Ingresar"
                      variant="contained"
                      icon={<i className="bx bx-check" />}
                      type="submit"
                    />
                    <BasicButtons
                      title="Eliminar"
                      variant="outlined"
                      icon={<i className="bx bx-trash" />}
                      type="button"
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
        <ScrollButton />
      </main>
    </>
  );
};

export default ParametersExercisesPage;
