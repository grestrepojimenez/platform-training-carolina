/* eslint-disable react-hooks/rules-of-hooks */
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
    handleRoutineInputChange,
  } = useRoutineContext();

  const methods = useForm();
  const navigate = useNavigate();
  const { exerciseData } = location.state;
  const { instructions } = exerciseData;

  // Acceder a la informacion dentro del hook useRoutineContext()
  const nameRoutine = Object.values(routineData.routines)[
    Object.values(routineData.routines).length - 1
  ];

  // Asegúrese de que los datos de ejercicio existan antes de renderizar
  if (!exerciseData) {
    return (
      <div>
        <h2>¡No se encontraron datos de ejercicio!</h2>
      </div>
    );
  }

  const onSubmit = (data) => {
    // Copiar la información del ejercicio existente
    const cardExerciseInfo = exerciseData;
    // Combinar la información del ejercicio con los datos del formulario
    const exerciseWithParams = {
      ...cardExerciseInfo, // Se copian los datos del ejercicio
      ...data, // Se agregan los datos del formulario
      additionalInfo: cardExerciseInfo.additionalInfo,
    };

    // Obtener rutina actual
    const nameRoutine = Object.values(routineData.routines)[
      Object.values(routineData.routines).length - 1
    ];


    // Obtener rutinas almacenadas en el localStorage (si existen)
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};

    // Verificar si la rutina ya existe en el localStorage
    const routineExists = storedRoutineData[nameRoutine.routineName];

    if (routineExists) {
      // Si la rutina ya existe, agregar el ejercicio a su lista de ejercicios
      storedRoutineData[nameRoutine.routineName].exercises.push(
        exerciseWithParams
      );
    } else {
      // Si la rutina no existe, crearla con el ejercicio
      storedRoutineData[nameRoutine.routineName] = {
        routineName: nameRoutine.routineName,
        exercises: [exerciseWithParams],
      };
    }

    console.log(routineExists);

    // Guardar las rutinas actualizadas en localStorage
    localStorage.setItem("routineData", JSON.stringify(storedRoutineData));


    // Resetear el formulario después de enviar
    methods.reset();

    // Redirigir a la página de creación de entrenamiento
    navigate("/trainingPlanPage");
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
              Rutina {nameRoutine.routineName}
            </p>
            Ejercicio {trainingCount + 1}
          </h2>

          <div className="flex justify-center mb-5">
            <CardExercises exercise={exerciseData} />
          </div>

          <div className="justify-center text-center">
            <p className="m-5">Definir parametros de entrenamiento</p>

            <div className="w-96 mx-auto">
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
                        handleRoutineInputChange("seriesNumber", e.target.value)
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
                        handleRoutineInputChange(
                          "numberRepetitions",
                          e.target.value
                        )
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
                        handleRoutineInputChange("weightLoad", e.target.value)
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
                        handleRoutineInputChange(
                          "averageDuration",
                          e.target.value
                        )
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
                        handleRoutineInputChange("instructions", e.target.value)
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
