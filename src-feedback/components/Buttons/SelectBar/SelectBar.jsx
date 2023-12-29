/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectBar = ({ option, title, icon, onSelectChange, id, name }) => {
  const [select, setSelect] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelect(selectedValue);

    onSelectChange(selectedValue);
  };

  return (
    <div>
      <FormControl
        variant="standard"
        color="error"
        sx={{ m: 1, minWidth: 120 }}
      >
        <InputLabel
          color="error"
          id="demo-simple-select-standard-label"
          className="text-whiteOpacity font-light"
        >
          {title}
        </InputLabel>
        <Select
          required
          labelId="demo-simple-select-standard-label"
          id={id}
          value={select}
          onChange={handleChange}
          label={title}
          IconComponent={icon}
          name={name}
          className=" text-white font-light border-b border-redOpacity w-56 flex text-left"
          sx={{
            "& .MuiSelect-icon": {
              color: "#FD3C3D",
              fontSize: "20px",
            },
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                backgroundColor: "#191A1F",
                color: "#FD3C3D",
              },
            },
          }}
        >
          <MenuItem value="" className="font-light tracking-wider text-sm">
            <em>None</em>
          </MenuItem>
          {Array.isArray(option) &&
            option.map((item, index) => (
              <MenuItem
                key={index}
                value={item.value} 
                className="font-light tracking-wider text-sm"
              >
                 {item.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBar;
