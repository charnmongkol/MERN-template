import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Switch from "@mui/material/Switch";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  isHighLightUpdateAction,
  isSaleUpdateAction,
} from "../../redux/actions/postsActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const TableRowTour = ({ item, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saleUpdate = useSelector((state) => state.saleUpdate);
  const { loading: loadingIsSale, success: successIsSale } = saleUpdate;
  const highlightUpdate = useSelector((state) => state.highlightUpdate);
  const { loading: loadingIsHighlight, success: successIsHighlight } =
    highlightUpdate;

  const [checkedSale, setCheckedSale] = useState(item.isSale);
  const [checkedHighlight, setCheckedHighlight] = useState(item.isHighlight);

  const handleIsSale = (id, isSale) => (e) => {
    dispatch(isSaleUpdateAction(id, !checkedSale));
    setCheckedSale(!checkedSale);
  };
  const handleIsHighlight = (id, isHighlight) => (e) => {
    dispatch(isHighLightUpdateAction(id, !checkedHighlight));
    setCheckedHighlight(!checkedHighlight);
  };
  const editPostList = (id) => (e) => {
    e.stopPropagation();
    navigate(`/admin/editpost/${id}`);
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${item._id}`);
      setCheckedSale(data.isSale);
      setCheckedHighlight(data.isHighlight);
    };
    if (checkedSale !== item.isSale) {
      fetching();
    }
  }, [successIsHighlight, successIsSale]);

  return (
    <>
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>
          <Switch
            checked={checkedSale}
            color="primary"
            onClick={handleIsSale(item._id, item.isSale)}
            inputProps={{ "aria-label": "controlled" }}
          />
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
          <Switch
            checked={checkedHighlight}
            color="success"
            onClick={handleIsHighlight(item._id, item.isHighlight)}
            inputProps={{ "aria-label": "controlled" }}
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
