/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card, CardContent, IconButton } from "@mui/material";

const CardExercises = ({ exercise, icon, onSelect , routineName }) => {
  const navigate = useNavigate();
  const { name, primaryMuscles, equipment, images } = exercise;

  const handleClick = () => {
    navigate(`/parametersExercisesPage/${routineName}/${name}`, {
      state: {
        exerciseData: exercise,
        routineName: routineName,
      },
    });
    // Llamamos a la función onSelect para manejar la selección de la tarjeta
    if (onSelect) {
      onSelect(exercise);
    }
  };

  return (
    <div className="p-1">
      <Card className="bg-grey w-96 lg:h-40">
        <CardContent className="relative">
          <div className="flex">
            <div>
              <img
                className="w-20 lg:w-24 rounded"
                src={images}
                alt={`Exercise: ${name}`}
              />
            </div>

            <div className="text-white ml-5 capitalize">
              <h2 className="text-base">{name}</h2>
              <p className="text-xs">{primaryMuscles}</p>
              <p className="mt-5 xl:mt-10 text-xs">{equipment}</p>
            </div>

            <div className="absolute bottom-0 right-0 mb-2 mr-2">
              <IconButton
                color="error"
                aria-label="add icon"
                onClick={handleClick}
              >
                {icon}
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardExercises;
