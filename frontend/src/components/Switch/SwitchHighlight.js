import React from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { isHighLightUpdateAction } from "../../redux/actions/postsActions";

const SwitchHighlight = (props) => {
  const { id, isHighlight, color } = props;

  const dispatch = useDispatch();

  // console.log(id, isHighlight);
  const [checked, setChecked] = useState(isHighlight);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // console.log(checked);
    // console.log(id, event.target.checked);
    dispatch(isHighLightUpdateAction(id, event.target.checked));
  };

  return (
    <Switch
      checked={checked}
      color={color || "primary"}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default SwitchHighlight;
