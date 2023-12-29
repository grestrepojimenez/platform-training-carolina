/* eslint-disable react/prop-types */
import { Alert, Snackbar } from "@mui/material";

const SnackBarCustom = ({ open, onClose, severity, message }) => {
  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
          <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            className="text-black"
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBarCustom;
