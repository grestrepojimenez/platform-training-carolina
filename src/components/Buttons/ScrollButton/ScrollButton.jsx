/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    // Usamos requestAnimationFrame para optimizar el evento de scroll
    requestAnimationFrame(() => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      {showButton && (
        <div className="fixed bottom-28 right-4">
          <Tooltip title="Scroll to top" placement="top-start">
            <Fab
              size="small"
              className="bg-redOpacity hover:bg-redOpacity"
              onClick={scrollToTop}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default ScrollButton;
