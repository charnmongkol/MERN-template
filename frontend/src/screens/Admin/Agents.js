import React, { useEffect, useState, lazy, Suspense } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";
import { allUsersForAdmin, singleUser } from "../../redux/actions/userActions";
const AgentDialog = lazy(() =>
  import("../../components/Dialog/AgentDialog.js")
);

const Agents = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const users = useSelector((state) => state?.allUsers);
  const { loading, allUsers, error } = users;

  const handleOpen = async (id) => {
    dispatch(singleUser(id));
    setOpen(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo.isAdmin === false) {
      navigate("/");
    } else {
      dispatch(allUsersForAdmin());
    }
  }, [dispatch, userInfo]);

  return (
    <DashboardLayOut title="รายชื่อ Agent ทั้งหมด">
      <div style={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>โลโก้</TableCell>
                <TableCell>ชื่อบริษัท</TableCell>
                <TableCell>เลขที่ใบอนุญาต</TableCell>
                <TableCell>อีเมลล์</TableCell>
                <TableCell>เบอร์โทร</TableCell>
                <TableCell>status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers &&
                allUsers.map((agent, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="center">
                      <img src={agent.pic} width="50" height="50" />
                    </TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.licenseNumber}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phoneNumber}</TableCell>
                    <TableCell>
                      {agent.status === false ? (
                        <Button variant="text" color="warning">
                          pending
                        </Button>
                      ) : (
                        <Button variant="text" color="success">
                          approved
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        component="button"
                        onClick={() => handleOpen(agent._id)}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AgentDialog open={open} setOpen={setOpen} />
      </Suspense>
    </DashboardLayOut>
  );
};

export default Agents;
