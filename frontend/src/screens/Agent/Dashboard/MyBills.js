import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import AgentLayout from "../../../components/Layout/AgentLayout";
import { getMyBills } from "../../../redux/actions/billsActions";
import moment from "moment";
import Button from "@mui/material/Button";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        my: 3,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="ค้นหา..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}
QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const MyBills = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myBills = useSelector((state) => state.myBills);
  const { mybills, loading: loadingMyBills } = myBills;
  const [dataTable, setDataTable] = useState([]);
  // console.log(mybills);
  // console.log("dataTable", dataTable);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(dataTable);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = dataTable.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };
  useEffect(() => {
    if (dataTable) {
      setRows(dataTable);
    }
  }, [dataTable]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getMyBills());
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (mybills) {
      setDataTable(mybills);
    }
  }, [dispatch, mybills]);

  const columns = [
    { field: "_id", headerName: "Ref.", flex: 1 },
    {
      field: "createdAt",
      headerName: "วันที่สร้าง",
      flex: 0.5,
      type: "actions",
      getActions: (params) => [
        <Button variant="text" color="primary">
          {moment(params.row.createdAt).format("MM/DD/YYYY")}
        </Button>,
      ],
    },
    {
      field: "expiredDate",
      type: "actions",
      headerName: "วันหมดอายุ",
      flex: 0.5,
      getActions: (params) => [
        <Button variant="text" color="warning">
          {moment(params.row.createdAt).add(3, "days").calendar("MM/DD/YYYY")}
        </Button>,
      ],
    },
    { field: "tourName", headerName: "ทัวร์", flex: 1 },
    { field: "tourCode", headerName: "รหัสทัวร์", flex: 0.5 },
    {
      field: "startAt",
      type: "actions",
      headerName: "วันที่เดินทาง",
      flex: 0.6,
      getActions: (params) => [
        <Button variant="text" color="primary">
          {moment(params.row.startAt).calendar("MM/DD/YYYY")}
        </Button>,
      ],
    },
    {
      field: "status",
      headerName: "Status",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <Button
          variant="text"
          color={
            params.row.status === "pending"
              ? "warning"
              : params.row.status === "approved"
              ? "success"
              : "error"
          }
        >
          {params.row.status}
        </Button>,
      ],
    },
  ];

  return (
    <AgentLayout title="คำสั่งจอง">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={loadingMyBills ? [] : rows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          autoHeight
          components={{ Toolbar: QuickSearchToolbar }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
        />
      </div>
    </AgentLayout>
  );
};

export default MyBills;
