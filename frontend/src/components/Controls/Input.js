import TextField from "@mui/material/TextField";
import React from "react";

const Input = (props) => {
  const {
    name,
    label,
    value,
    type,
    error = null,
    onChange,
    InputLabelProps,
    rows,
    multiline = false,
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputLabelProps={InputLabelProps}
      type={type}
      fullWidth
      multiline={multiline}
      rows={rows}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
