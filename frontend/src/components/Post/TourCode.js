import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByCode } from "../../redux/actions/postsActions";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Button from "@mui/material/Button";

function getPeriod(params) {
  return `${moment(params.row.startAt).format("DD-MM-YYYY")} - ${moment(
    params.row.entAt
  ).format("DD-MM-YYYY")}`;
}

const TourCode = ({ tourCode }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  //
  const [data, setData] = useState([]);

  const tourByCode = useSelector((state) => state.tours);
  const { loading, error, tours } = tourByCode;
  // console.log("tours", tours);

  useEffect(() => {
    if (tourCode) {
      dispatch(getPostsByCode(tourCode));
    }
  }, [dispatch, tourCode]);

  // useEffect(() => {
  //   setData(tours);
  // }, [tours]);

  // console.log(data);
  const goToTour = (id) => (e) => {
    e.preventDefault();
    navigation(`/posts/${id}`);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const columns = [
    { field: "tourCode", headerName: "รหัส", flex: 0.7 },
    { field: "tourName", headerName: "ทัวร์", flex: 0.7 },
    {
      field: "startAt",
      type: "actions",
      headerName: "วันไป (ด/ว/ป)",
      flex: 0.7,
      getActions: (params) => [
        <Button variant="text" color="warning">
          {moment(params.row.startAt).format("DD-MM-YYYY")}
        </Button>,
      ],
    },
    {
      field: "endAt",
      type: "actions",
      headerName: "วันกลับ (ด/ว/ป)",
      flex: 0.7,
      getActions: (params) => [
        <Button variant="text" color="warning">
          {moment(params.row.endAt).format("DD-MM-YYYY")}
        </Button>,
      ],
    },
    { field: "seatsCl", headerName: "ที่นั่ง", flex: 0.3 },
    {
      field: "seatsAval",
      type: "actions",
      headerName: "Available",
      flex: 0.3,
      getActions: (params) => [
        <Button
          variant="text"
          color={params.row.seatsAval === 0 ? "error" : "success"}
          onClick={goToTour(params.row._id)}
        >
          {params.row.seatsAval}
        </Button>,
      ],
    },
    { field: "commission", headerName: "ค่าคอมบริษัท", flex: 0.3 },
    { field: "comSales", headerName: "ค่าคอมเซลล์", flex: 0.3 },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 0.5,
      getActions: ({ id }) => [
        <Chip label="จอง" color="primary" onClick={goToTour(id)} />,
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {tours && (
        <DataGrid rows={tours} columns={columns} getRowId={(row) => row._id} />
      )}
    </div>
  );
};

export default TourCode;
