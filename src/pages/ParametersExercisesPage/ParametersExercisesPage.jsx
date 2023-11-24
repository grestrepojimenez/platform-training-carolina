import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { IconButton, Fab, Tooltip } from "@mui/material";
import NavBar from "../../layout/NavBar/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useRoutineContext } from "../../hooks/useRoutineContext";
import { useInputContext } from "../../hooks/useInputContext";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";
import InputsBar from "../../components/InputsBar/InputsBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";

const ParametersExercisesPage = () => {
  const location = useLocation();
  const { routineData, trainingCount, updateTrainingCount } =
    useRoutineContext();
  const { handleInputChange } = useInputContext();
  const methods = useForm();
  const { reset } = methods;
  const { exerciseData } = location.state;
  const [scrollCount, setScrollCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const { addExerciseToRoutine, removeRoutine } = useRoutineContext();
  updateTrainingCount(routineData.routineName);


  // Asegúrese de que los datos de ejercicio existan antes de renderizar
  if (!exerciseData) {
    return (
      <div>
        <h2>¡No se encontraron datos de ejercicio!</h2>
      </div>
    );
  }


  const onSubmit = (data) => {
    // Obtener el ejercicio seleccionado de la ubicación actual
    const { exerciseData } = location.state;

    // Combinar los datos del formulario con el ejercicio seleccionado
    const exerciseWithParams = {
      ...data,
      ...exerciseData,
    };

    // Agregar el ejercicio ingresado a la rutina actual en el contexto
    addExerciseToRoutine(routineData.routineName, exerciseWithParams);

    // Guardar los datos del ejercicio ingresado en localStorage
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};

    // Verificar si ya existen datos para esta rutina en el localStorage
    const existingRoutineData = storedRoutineData[routineData.routineName] || {
      exercises: [],
    };

    // Agregar el nuevo ejercicio a la lista de ejercicios para esta rutina en localStorage
    existingRoutineData.exercises.push(data);

    // Actualizar o crear la entrada para la rutina en el localStorage
    storedRoutineData[routineData.routineName] = existingRoutineData;
    localStorage.setItem("routineData", JSON.stringify(storedRoutineData));

    reset();
  };

  const { instructions } = exerciseData;

  // Función para desplazar al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  // Function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrollCount((prevCount) => prevCount + 1);
      if (scrollCount > 1) {
        setShowButton(true);
      }
    } else {
      setShowButton(false);
    }
  };

  // Agregar el listener al evento scroll para mostrar u ocultar el botón
  window.addEventListener("scroll", handleScroll);

  const onDelete = () => {
    // Clear exercises for the current routine in the context and localStorage
    removeRoutine(routineData.routineName);
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
          <h2 className="uppercase mb-5 text-red text-xl font-medium mt-5 text-center">
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
                    />
                    <InputsBar
                      id="instructions"
                      label="Instrucciones"
                      type="text"
                      name="instructions"
                      icon={<i className="bx bx-file" />}
                      className="mb-4 overflow-hidden"
                      onChange={(e) =>
                        handleInputChange("instructions", e.target.value)
                      }
                      maxRows={10}
                      defaultValue={String(instructions).substring(0, 50)}
                    />
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
                      onClick={onDelete}
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
        {showButton ? (
          <div className="fixed bottom-4 right-4">
            <Tooltip title="Scroll to top" placement="top-start">
              <Fab
                size="small"
                className="bg-redOpacity hover:bg-redOpacity"
                onClick={scrollToTop}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </Tooltip>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default ParametersExercisesPage;
