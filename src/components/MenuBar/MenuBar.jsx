/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";

const MenuBar = ({ title, list, exercisesData, setFilteredExercises }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // Filtra la informacion seleccionada
  const handleFilter = (item) => {
    const filteredData = exercisesData.filter(
      (exercise) =>
        exercise.primaryMuscles.includes(item) || exercise.equipment === item
    );
    setFilteredExercises(filteredData.length > 0 ? filteredData : exercisesData);
    setOpen(false);
  };

  return (
    <div className="z-50">
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<i className="bx bx-chevron-down" />}
        color="error"
        className="capitalize font-light tracking-wider "
      >
        {title}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className="bg-black text-red px-6 capitalize "
                >
                  {Array.isArray(list) &&
                    list.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleFilter(item)}
                        className="font-light tracking-wider text-sm"
                      >
                        {item}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuBar;
