import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/system/Box";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusUser } from "../../redux/actions/userActions";

const AgentDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.singleUser);
  const { user } = singleUser;
  const [status, setStatus] = useState("");

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (status) {
      dispatch(updateStatusUser(user._id, status));
      handleClose();
    }
  };
  return (
    <div>
      {user && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogTitle sx={{ textAlign: "end" }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Logo
                    </TableCell>
                    <TableCell>
                      <img src={user.pic} width="250" height="250" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ชื่อบริษัท
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      รูปใบอนุญาต
                    </TableCell>
                    <TableCell>
                      <img src={user.licensePic} width="150" height="150" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      เลขที่ใบอนุญาต
                    </TableCell>
                    <TableCell>{user.licenseNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      วันออกใบอนุญาต
                    </TableCell>
                    <TableCell>{user.licenseStart}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      วันหมดอายุใบอนุญาต
                    </TableCell>
                    <TableCell>{user.licenseEnd}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      อีเมลล์
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      เบอร์โทรศัพท์
                    </TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      โซน
                    </TableCell>
                    <TableCell>{user.zone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ที่อยู่บริษัท
                    </TableCell>
                    <TableCell>{user.address}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      website
                    </TableCell>
                    <TableCell>{user.website}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      status
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        {user.status === false ? (
                          <Button variant="text" color="warning">
                            pending
                          </Button>
                        ) : (
                          <Button variant="text" color="success">
                            approved
                          </Button>
                        )}

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <MenuItem value="true">approved</MenuItem>
                            <MenuItem value="false">pending</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <DialogActions>
              <Button autoFocus type="button" onClick={handleSubmit}>
                บันทึก
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AgentDialog;
