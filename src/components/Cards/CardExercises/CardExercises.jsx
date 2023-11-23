/* eslint-disable react/prop-types */
import { Card, CardContent, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CardExercises = ({src,name, equipment,primaryMuscles }) => {
  return (
    <div  className="p-1">
      <Card className="bg-grey w-96">
        <CardContent className="relative">
          <div className="flex">
            <div>
              <img
                className="w-20 lg:w-24 rounded"
                src={src}
                alt="iamegen ejercicios"
              />
            </div>

            <div className="text-white ml-5 capitalize">
              <h2 className="text-base">{name}</h2>
              <p className="text-xs">{primaryMuscles}</p>
              <p className="mt-5 text-xs">{equipment}</p>
            </div>

            <div className="absolute bottom-0 right-0 mb-2 mr-2">
              <IconButton color="error" aria-label="add icon">
                <AddCircleIcon />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardExercises;
