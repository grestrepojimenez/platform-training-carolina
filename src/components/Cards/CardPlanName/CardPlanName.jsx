/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent, IconButton } from "@mui/material";

const CardPlanName = ({ routineName }) => {
  return (
    <div className="p-1">
      <Card className="bg-grey w-96">
        <CardContent>
          <div className="flex justify-between items-center tracking-wide capitalize">
            <h3 className="text-white">{routineName}</h3>
            <div>
              <Link to={`/trainingStartPage/${routineName}`}>
                <IconButton color="error" aria-label="add icon">
                  <i className="bx bx-dumbbell" />
                </IconButton>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPlanName;
