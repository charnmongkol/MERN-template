import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SwitchComponent from "../Switch/Switch";
import SwitchHighlight from "../Switch/SwitchHighlight";

const TableRowTour = ({ item, index }) => {
  const navigate = useNavigate();

  const editPostList = (id) => (e) => {
    e.stopPropagation();
    navigate(`/admin/editpost/${id}`);
  };

  return (
    <>
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>
          <SwitchComponent id={item._id} isSale={item.isSale} />
        </TableCell>
        <TableCell>{item.tourName}</TableCell>
        <TableCell>{item.tourCode}</TableCell>
        <TableCell>
          <Button variant="text" color="warning">
            {moment(item.startAt).format("DD-MM-YYYY")}
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="text" color="warning">
            {moment(item.endAt).format("DD-MM-YYYY")}
          </Button>
        </TableCell>
        <TableCell>{item.seatsCl}</TableCell>
        <TableCell>
          <SwitchHighlight
            id={item._id}
            isHighlight={item.isHighlight}
            color="success"
          />
        </TableCell>
        <TableCell>
          <IconButton
            color="primary"
            component="button"
            onClick={editPostList(item._id)}
          >
            <EditRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowTour;
