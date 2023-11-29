/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";

const CardTraining = ({
  name,
  primaryMuscles,
  equipment,
  images,
  set,
  rep,
  lib,
  exerciseNumber,
  onClick,
  icon,
}) => {
  return (
    <div className="p-1">
      <Card className="bg-grey w-96 h-40 lg:h-44">
        <CardActionArea>
          <CardContent className="relative">
            <div>

              <div className="relative flex pb-5">
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

                <div className="absolute top-0 right-0 flex">
                  <Tooltip title="Numero de ejercicio">
                    <div className=" w-6 h-6 rounded-full flex items-center justify-center border border-red">
                      <p className="text-xs text-red font-medium">
                        {exerciseNumber}
                      </p>
                    </div>
                  </Tooltip>
                </div>
              </div>

              <hr />

              <div className="flex p-2 space-x-6">
                <div className="flex space-x-2">
                  <i className="bx bx-list-ul text-red text-xl" />
                  <p className="text-white text-xs mt-1">{set} Set</p>
                </div>

                <div className="flex space-x-2">
                  <i className="bx bx-repeat text-red text-lg" />
                  <p className="text-white text-xs mt-1">{rep} Rep</p>
                </div>

                <div className="flex space-x-2">
                  <i className="bx bx-dumbbell text-red text-lg" />
                  <p className="text-white text-xs mt-1">{lib} Lib</p>
                </div>

                <div className="flex justify-end">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    className="ml-14"
                    color="error"
                    onClick={onClick}
                  >
                    {icon}
                  </IconButton>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardTraining;
