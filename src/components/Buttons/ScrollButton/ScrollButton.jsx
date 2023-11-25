/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrollCount((prevCount) => prevCount + 1);
      if (scrollCount > 1) {
        setShowButton(true);
      }
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollCount]);
  
  return (
    <>
      {showButton && (
        <div className="fixed bottom-4 right-4">
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
