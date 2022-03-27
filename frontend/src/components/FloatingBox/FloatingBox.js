import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

const Item = styled(Box)`
  position: fixed;
  bottom: 28px;
  right: 28px;
`;

const ButtonFloating = styled(Button)`
  border-color: #002855;
  color: #ffffff;
  height: 80px;
  &:hover,
  &:active,
  &:visited,
  &:link,
  &:focus {
    color: #ffffff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }
`;

const FloatingBox = () => {
  return (
    <Item sx={{ zIndex: "tooltip" }}>
      <ButtonFloating variant="contained" href="/agents">
        "ติดต่อตัวแทนจำหน่ายใกล้บ้านท่าน"
      </ButtonFloating>
    </Item>
  );
};

export default FloatingBox;
