import { useInputContext } from "../../hooks/useInputContext";

const TrainingPlanPage = () => {
  const { inputData } = useInputContext();

  return (
    <div>
      <h2>Rutina {inputData.seriesNumber}</h2>
    </div>
  );
};

export default TrainingPlanPage;
