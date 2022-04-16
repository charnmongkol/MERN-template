import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";
import { getAllBills, getBillById } from "../../redux/actions/billsActions";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Button from "@mui/material/Button";
import moment from "moment";

const DataDialog = lazy(() => import("../../components/Dialog/DataDialog"));

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

const Bill = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allBills = useSelector((state) => state.allBills);
  const { allbills, loading: loadingMyBills } = allBills;
  const [dataTable, setDataTable] = useState([]);
  // console.log(allbills);
  // console.log("dataTable", dataTable);

  const singleBill = useSelector((state) => state.bill);
  const { loading, error, bill } = singleBill;

  const [open, setOpen] = useState(false);

  const handleOpen = async (id) => {
    // console.log(id);
    dispatch(getBillById(id));

    setOpen(true);
  };

  const columns = [
    { field: "refNumber", headerName: "Ref.", flex: 0.2 },
    {
      field: "createdAt",
      headerName: "วันที่สร้าง",
      flex: 0.6,
      type: "actions",
      getActions: (params) => [
        <Button variant="text" color="primary">
          {moment(params.row.createdAt).calendar()}
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
          {moment().add(30, "days").calendar(params.row.createdAt)}
        </Button>,
      ],
    },
    { field: "tour", headerName: "ทัวร์", flex: 1 },
    { field: "tourCode", headerName: "รหัสทัวร์", flex: 0.5 },
    {
      field: "startAt",
      type: "actions",
      headerName: "วันที่เดินทาง",
      flex: 0.6,
      getActions: (params) => [
        <Button variant="text" color="primary">
          {moment(params.row.startAt).calendar()}
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
    {
      field: "actions",
      type: "actions",
      headerName: "แก้ไข",
      flex: 0.5,
      getActions: (params) => [
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => handleOpen(params.row._id, params.row._agent)}
        >
          <EditRoundedIcon />
        </IconButton>,
      ],
    },
  ];

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
    if (userInfo) {
      dispatch(getAllBills());
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (allbills) {
      setDataTable(allbills);
    }
  }, [dispatch, allbills]);

  useEffect(() => {
    setRows(dataTable);
  }, [dataTable, dispatch]);

  return (
    <DashboardLayOut title="คำสั่งจอง">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={loadingMyBills ? [] : rows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.refNumber}
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
      <Suspense fallback={<div>Loading...</div>}>
        <DataDialog open={open} setOpen={setOpen} data={singleBill} />
      </Suspense>
    </DashboardLayOut>
  );
};

export default Bill;
