import React, { useEffect, useState } from "react";
import { Accordion, Badge, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, listPosts } from "../../redux/actions/postsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import moment from "moment";
import PropTypes from "prop-types";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

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

const MyPosts = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [myposts, setMyposts] = useState([]);

  const postList = useSelector((state) => state?.postList);
  const { loading, posts, error } = postList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //taking state hook/ change if post created
  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate } = postCreate;

  //changeif post updated
  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //delete operation
      dispatch(deletePostAction(id));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listPosts());
    if (!userInfo && userInfo.isAdmin !== true) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const [searchText, setSearchText] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [rows, setRows] = useState(posts);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = posts.filter((row) => {
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
    if (posts) {
      setDataTable(posts);
    }
  }, [dispatch, posts]);

  // console.log("posts", posts);
  // console.log("dataTable", dataTable);
  // console.log("rows", rows);

  const editPostList = (id) => (e) => {
    e.stopPropagation();
    navigate(`/admin/editpost/${id}`);
  };
  const columns = [
    { field: "_id", headerName: "No.", flex: 0.5 },
    { field: "tourName", headerName: "ทัวร์", flex: 1 },
    { field: "tourCode", headerName: "รหัส", flex: 1 },
    // { field: "country", headerName: "ประเทศ", flex: 1 },
    {
      field: "startAt",
      type: "actions",
      headerName: "วันไป",
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
      headerName: "วันกลับ",
      flex: 0.7,
      getActions: (params) => [
        <Button variant="text" color="warning">
          {moment(params.row.endAt).format("DD-MM-YYYY")}
        </Button>,
      ],
    },
    { field: "seatsCl", headerName: "ที่นั่ง", flex: 0.5 },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="edit"
          onClick={editPostList(id)}
        />,
      ],
    },
  ];

  return (
    <DashboardLayOut title={`${userInfo.name} Posts`}>
      <Box sx={{ my: 1, display: "flex", gap: 1 }}>
        <Button
          href="/admin/createpost"
          variant="outlined"
          color="primary"
          startIcon={<AddCircleRoundedIcon />}
        >
          เพิ่มทัวร์ใหม่
        </Button>
        <Button
          href="/admin/createpostbycode"
          variant="outlined"
          color="primary"
          startIcon={<AddCircleRoundedIcon />}
        >
          เพิ่มทัวร์ (จากtour codeเดิม)
        </Button>
      </Box>
      <Paper>
        {errorDelete && (
          <ErrorMessage variant="error">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="error">{error}</ErrorMessage>}
        {loading && <Loading />}
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={loading ? [] : rows}
            columns={columns}
            pageSize={20}
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
      </Paper>
    </DashboardLayOut>
  );
};

export default MyPosts;
