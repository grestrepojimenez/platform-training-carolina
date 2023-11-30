/* eslint-disable react/prop-types */
import { CardActionArea } from "@mui/material";

const CardCheck = ({ set, rep, lib, isChecked }) => {
  return (
    <CardActionArea>
      <div
        className={`flex border rounded-md ${
          isChecked ? "border-lime " : "border-red"
        }`}
      >
        <div className="flex p-2 space-x-6">
          <div className="flex space-x-2">
            <i
              className={`bx bx-list-ul  text-xl ${
                isChecked ? "text-lime" : "text-red"
              }`}
            />
            <p className="text-white text-xs mt-1">{set} Set</p>
          </div>

          <div className="flex space-x-2">
            <i
              className={`bx bx-repeat text-lg ${
                isChecked ? "text-lime" : "text-red"
              }`}
            />
            <p className="text-white text-xs mt-1">{rep} Rep</p>
          </div>

          <div className="flex space-x-2">
            <i
              className={`bx bx-dumbbell text-lg ${
                isChecked ? "text-lime" : "text-red"
              }`}
            />
            <p className="text-white text-xs mt-1">{lib} Lib</p>
          </div>
        </div>
        <div className="flex ml-28 mt-1">
          {isChecked && (
            <i className="bx bx-check text-lime text-2xl font-black" />
          )}
        </div>
      </div>
    </CardActionArea>
  );
};

export default CardCheck;
