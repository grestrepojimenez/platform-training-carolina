/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ReturnButton = () => {
  return (
    <div className="absolute md:mt-2 md:ml-8 ml-3">
      <IconButton color="error">
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default ReturnButton;
