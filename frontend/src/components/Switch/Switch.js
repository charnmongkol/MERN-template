import React from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { isSaleUpdateAction } from "../../redux/actions/postsActions";
import { useEffect } from "react";

const SwitchComponent = (props) => {
  const { id, isSale } = props;

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(isSale);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // console.log(checked);
    // console.log(id, event.target.checked);
    dispatch(isSaleUpdateAction(id, event.target.checked));
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default SwitchComponent;
