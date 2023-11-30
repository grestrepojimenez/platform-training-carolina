/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import "./RatingBar.css";

const labels = {
  0.5: <i className="bx bxs-sad bx-tada text-red text-xl" />,
  1: <i className="bx bxs-sad bx-tada text-red text-xl" />,
  1.5: <i className="bx bxs-confused bx-tada text-red text-xl" />,
  2: <i className="bx bxs-confused bx-tada text-red text-xl" />,
  2.5: <i className="bx bxs-meh bx-tada text-red text-xl" />,
  3: <i className="bx bxs-meh bx-tada text-red text-xl" />,
  3.5: <i className="bx bxs-smile bx-tada text-red text-xl" />,
  4: <i className="bx bxs-smile bx-tada text-red text-xl" />,
  4.5: <i className="bx bxs-happy-beaming bx-tada text-red text-xl" />,
  5: <i className="bx bxs-happy-beaming bx-tada text-red text-xl" />,
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RatingBar = ({ onRatingChange }) => {
  const [value, setValue] = useState(3.5);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        size="small"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
            setValue(newValue);
            onRatingChange(newValue); // Llamar a la función de devolución de llamada
          }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={
          <StarBorderIcon fontSize="inherit" className="text-redOpacity" />
        }
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
};

export default RatingBar;
