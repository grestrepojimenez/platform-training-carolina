/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RepeatIcon from "@mui/icons-material/Repeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BalanceIcon from "@mui/icons-material/Balance";

import NavBar from "../../layout/NavBar/NavBar";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import SelectBar from "../../components/Buttons/SelectBar/SelectBar";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";
import InputsBar from "../../components/InputsBar/InputsBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import ParameterList from "./ParameterList";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";

const ParametersExercisesPage = () => {
  const location = useLocation();
  const { routineData, handleRoutineInputChange, addExerciseToRoutine } =
    useRoutineContext();

  const methods = useForm();
  const navigate = useNavigate();
  const { exerciseData } = location.state;
  const { instructions } = exerciseData;

  const optionList = ParameterList();

  const [selectedSeriesValue, setSelectedSeriesValue] = useState(0);
  const [numberRepetitionsValue, setNumberRepetitionsValue] = useState(0);
  const [averageDurationValue, setAverageDurationValue] = useState(0);
  const [weightLoadValue, setWeightLoad] = useState(0);

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
    const cardExerciseInfo = exerciseData; // Copiar la información del ejercicio existente

    const exerciseWithParams = {
      ...cardExerciseInfo,
      selectedSeries: parseInt(selectedSeriesValue),
      numberRepetitions: parseInt(numberRepetitionsValue),
      averageDuration: parseInt(averageDurationValue),
      weightLoad: parseInt(weightLoadValue),
      additionalInfo: cardExerciseInfo.additionalInfo,
      instructions: data.instructions,
    };

    // Obtener rutina actual
    const nameRoutine = Object.values(routineData.routines)[
      Object.values(routineData.routines).length - 1
    ];

    // Agregar el ejercicio a la rutina actual
    addExerciseToRoutine(nameRoutine.routineName, exerciseWithParams);
    methods.reset(); // Resetear el formulario después de enviar
    navigate("/trainingPlanPage"); // Redirigir a la página de creación de entrenamiento
  };

  return (
    <>
      <div>
        <BannerNavBar />
      </div>

      <div className="justify-center relative">
        <div>
          <p className="uppercase mb-5 text-red font-medium mt-8 tracking-wider text-xl lg:text-2xl text-center ">
            Rutina - {nameRoutine.routineName}
          </p>

          <div className="flex justify-center mb-5">
            <CardExercises exercise={exerciseData} />
          </div>

          <div className="justify-center text-center">
            <p className="m-5">Definir parametros de entrenamiento</p>

            <div className="w-96 mx-auto">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="mt-5">
                    <SelectBar
                      id="selectedSeries"
                      name="selectedSeries"
                      option={optionList.series}
                      title="Numero Series"
                      icon={FormatListBulletedIcon}
                      onSelectChange={(selectedValue) => {
                        handleRoutineInputChange(
                          "selectedSeries",
                          selectedValue
                        );
                        setSelectedSeriesValue(selectedValue); // Actualiza el estado con el valor seleccionado
                      }}
                    />
                    <SelectBar
                      id="numberRepetitions"
                      name="numberRepetitions"
                      option={optionList.repetitions}
                      title="Numero Rep"
                      icon={RepeatIcon}
                      onSelectChange={(selectedValue) => {
                        handleRoutineInputChange(
                          "numberRepetitions",
                          selectedValue
                        );
                        setNumberRepetitionsValue(selectedValue); // Actualiza el estado con el valor seleccionado
                      }}
                    />

                    <SelectBar
                      id="averageDuration"
                      name="averageDuration"
                      option={optionList.averageDuration}
                      title="Duracion Total Ejercicio"
                      icon={AccessTimeIcon}
                      onSelectChange={(selectedValue) => {
                        handleRoutineInputChange(
                          "averageDuration",
                          selectedValue
                        );
                        setAverageDurationValue(selectedValue); // Actualiza el estado con el valor seleccionado
                      }}
                    />

                    <SelectBar
                      id="weightLoad"
                      name="weightLoad"
                      option={optionList.weightLoad}
                      title="Peso a cargar (Lib)"
                      icon={BalanceIcon}
                      onSelectChange={(selectedValue) => {
                        handleRoutineInputChange("weightLoad", selectedValue);
                        setWeightLoad(selectedValue); // Actualiza el estado con el valor seleccionado
                      }}
                    />

                    <InputsBar
                      id="instructions"
                      label="Instrucciones"
                      type="text"
                      name="instructions"
                      icon={<i className="bx bx-file" />}
                      className="mb-4 overflow-hidden w-56"
                      onChange={(e) =>
                        handleRoutineInputChange("instructions", e.target.value)
                      }
                      maxRows={50}
                      isMultiline={true}
                      defaultValue={instructions}
                      contextType="routine"
                    />
                  </div>

                  <div className="md:flex mt-5 mb-28 justify-center">
                    <BasicButtons
                      title="Ingresar"
                      variant="contained"
                      icon={<i className="bx bx-check" />}
                      type="submit"
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
        <ScrollButton />
        <div className="pb-24">
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default ParametersExercisesPage;
