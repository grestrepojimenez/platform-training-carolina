/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, IconButton } from "@mui/material";
import { useRoutineContext } from "../../../hooks/useRoutineContext";
useRoutineContext;

const CardPlanName = ({ routineName }) => {
  const { removeRoutine } = useRoutineContext();

  const handleDelete = () => {
    removeRoutine(routineName); // Llama a la función removeRoutine con el nombre de la rutina a eliminar
  };

  return (
    <div className="p-1">
      <Link to={`/trainingStartPage/${routineName}`}>
        <Card className="bg-grey w-96">
          <CardActionArea>
            <CardContent>
              <div className="flex justify-between items-center tracking-wide capitalize">
                <IconButton
                  color="error"
                  aria-label="eliminar"
                  onClick={handleDelete}
                >
                  <i className="bx bx-trash" />
                </IconButton>

                <h3 className="text-white">{routineName}</h3>

                <div>
                  <IconButton color="error" aria-label="ver rutina">
                    <i className="bx bx-dumbbell" />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default CardPlanName;
