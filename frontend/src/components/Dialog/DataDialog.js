import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { billUpdateStatus } from "../../redux/actions/billsActions";
import { singleUser } from "../../redux/actions/userActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DataDialog = ({ open, setOpen, data }) => {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [userId, setUserId] = useState(data.bill?.agent);

  const agent = useSelector((state) => state.singleUser);
  const { user } = agent;

  // console.log(data.bill?.status);
  useEffect(() => {
    if (data.bill?.agent && open === true) {
      dispatch(singleUser(data.bill?.agent));
      setStatus(data.bill?.status);
    }
  }, [data.bill?.agent]);

  // console.log(data);

  const handleSubmit = () => {
    dispatch(billUpdateStatus(data.bill?._id, status, remark));
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {data.bill?.tour}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {data.bill && user && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Agent: {user.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                หมายเลขใบอณุญาต: {user.licenseNumber}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="">
                  <TableHead sx={{ backgroundColor: "#002855" }}>
                    <TableRow>
                      <TableCell align="center" sx={{ color: "white" }}>
                        ลักษณะห้องพัก
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        จำนวน
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        ผู้ใหญ่พัก 2 ท่าน
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityA}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (เสริมเตียง)
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityB}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (ไม่เสริมเตียง)
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityC}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        พักเดี่ยว
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityD}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        เด็กทารก ( Infant)
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityE}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        ไม่มีตั๋วเครื่องบิน (Join Land)
                      </TableCell>
                      <TableCell align="center">
                        {data.bill?.quantityF}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell align="right">
                        {data.bill?.totalAmount} บาท
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ my: 2 }}>
                <TextField
                  id="standard-basic"
                  value={remark === "" ? data.bill?.remark : remark}
                  label="หมายเหตุ"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setRemark(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          )}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label={data.bill?.status}
              color={
                data.bill?.status === "pending"
                  ? "warning"
                  : data.bill?.status === "approved"
                  ? "success"
                  : "error"
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="approved">approved</MenuItem>
                <MenuItem value="cancled">cancled</MenuItem>
                <MenuItem value="pending">pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            บันทึก
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default DataDialog;

const statusOpts = [
  { value: "approved", title: "approved" },
  { value: "cancled", title: "cancled" },
];
