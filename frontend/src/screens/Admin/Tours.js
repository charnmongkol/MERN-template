import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listPosts } from "../../redux/actions/postsActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import TableRow from "@mui/material/TableRow";

const TableRowTour = lazy(() => import("../../components/Table/TableRow"));
const DashboardLayOut = lazy(() =>
  import("../../components/Layout/DashboardLayOut")
);

const SearchBox = styled(Box)`
  margin: auto;
  border-radius: 4px;
`;

const Tours = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector((state) => state?.postList);
  const { loading, posts, error } = postList;

  useEffect(() => {
    if (!userInfo && userInfo.isAdmin !== true) {
      navigate("/");
    } else {
      dispatch(listPosts());
    }
  }, [dispatch, userInfo]);

  const [query, setQuery] = useState("");

  const searching = (data) => {
    return data.filter(
      (ele, ind) =>
        ind === posts.findIndex((elem) => elem._id === ele._id) &&
        (ele.tourName.toLowerCase().includes(query) ||
          ele.tourCode.toLowerCase().includes(query))
    );
  };

  const byName = (a, b) => {
    if (a.tourName > b.tourName) {
      return 1;
    } else if (b.tourName > a.tourName) {
      return -1;
    } else {
      return 0;
    }
  };
  const byStartDate = (a, b) => {
    return new Date(a.startAt).valueOf() - new Date(b.startAt).valueOf();
  };

  return (
    <DashboardLayOut title="รายชื่อ Agent ทั้งหมด">
      <SearchBox sx={{ width: { md: "50%", sm: "100%" } }}>
        <TextField
          id="outlined-basic"
          label="ค้นหา"
          variant="outlined"
          fullWidth
          onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
        />
      </SearchBox>
      <div style={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>เปิด-ปิด</TableCell>
                <TableCell>ชื่อทัวร์</TableCell>
                <TableCell>รหัสโปรแกรม</TableCell>
                <TableCell>วันไป</TableCell>
                <TableCell>วันกลับ</TableCell>
                <TableCell>ที่นั่ง</TableCell>
                <TableCell>highlight</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts &&
                searching(posts)
                  .sort(byStartDate)
                  .sort(byName)
                  .map((item, index) => (
                    <Suspense
                      key={index}
                      fallback={
                        <TableRow>
                          <TableCell>Loading...</TableCell>
                        </TableRow>
                      }
                    >
                      <TableRowTour item={item} index={index} />
                    </Suspense>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DashboardLayOut>
  );
};

export default Tours;
