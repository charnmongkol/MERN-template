import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

const SelectDropdown = (props) => {
  const { name, label, value, error = null, options, onChange } = props;
  return (
    <FormControl variant="outlined" {...(error && { error: true })} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} onChange={onChange} value={value}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectDropdown;
