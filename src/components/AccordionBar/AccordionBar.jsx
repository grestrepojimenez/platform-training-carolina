/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionBar = ({ instructions }) => {
  return (
    <div className="flex justify-center">
      <Accordion className="bg-black text-white text-xs tracking-wider w-96">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-red" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-sm">Instrucciones</p>
        </AccordionSummary>
        <AccordionDetails>
          <p>{instructions}</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionBar;
