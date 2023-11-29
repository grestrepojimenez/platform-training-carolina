/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";

const CardCheckbox = ({ set, rep, lib }) => {
  return (
    <div className=" flex border border-red rounded-md">
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
      </div>

      <div className="flex ml-24">
        <Checkbox
                
          color="error"
          sx={{
            color: "#FD3C3D",
            "&.Mui-checked": {
              color: "#FD3C3D",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CardCheckbox;
