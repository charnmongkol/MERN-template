import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import DeveloperModeRoundedIcon from "@mui/icons-material/DeveloperModeRounded";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createBillAction } from "../../redux/actions/billsActions";
import Loading from "../Loading";
import { seatUpdateAction } from "../../redux/actions/postsActions";

const NotiPopup = lazy(() => import("../../components/Modal/NotiPopup"));
const TourCode = lazy(() => import("./TourCode"));

const TAX_RATE = 0.07;

let isBooking = false;

const Post = () => {
  const dispatch = useDispatch();
  const [postId, setPostId] = useState("");
  const [tourName, setTourName] = useState("");
  const [tourCode, setTourCode] = useState("");
  const [highlight, setHighlight] = useState("");
  const [country, setCountry] = useState([]);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [commission, setCommission] = useState("");
  const [comSales, setComSales] = useState("");
  const [seatsCl, setSeatsCl] = useState("");
  const [seatsGu, setSeatsGu] = useState("");
  const [seatsAval, setSeatsAval] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [wordFile, setWordFile] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [priceC, setPriceC] = useState("");
  const [priceD, setPriceD] = useState("");
  const [priceE, setPriceE] = useState("");
  const [priceF, setPriceF] = useState("");

  const [seats, setSeats] = useState({
    quantityA: 0,
    quantityB: 0,
    quantityC: 0,
    quantityD: 0,
    quantityE: 0,
    quantityF: 0,
  });

  const [totalSeats, setTotalSeats] = useState(0);
  // console.log("seatsAval", seatsAval);
  // console.log("seats", seats);
  const [subTotal, setSubtotal] = useState("0");
  const [totalAmount, setTotalAmount] = useState("0");
  // const [tax, setTax] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const params = useParams();
  const history = useNavigate();

  //get data
  useEffect(() => {
    if (userInfo) {
      const fetching = async () => {
        const { data } = await axios.get(`/api/posts/${params.id}`);
        // console.log(data);
        setPostId(data._id);
        setTourName(data.tourName);
        setTourCode(data.tourCode);
        setHighlight(data.highlight);
        setCountry(data.country);
        setCommission(data.commission);
        setComSales(data.comSales);
        setSeatsCl(data.seatsCl);
        setSeatsGu(data.seatsGu);
        setSeatsAval(data.seatsAval);
        setStartAt(data.startAt);
        setEndAt(data.endAt);
        setFeaturedImage(data.featuredImage);
        setPdfFile(data.pdfFile);
        setWordFile(data.wordFile);
        setPriceA(data.priceA);
        setPriceB(data.priceB);
        setPriceC(data.priceC);
        setPriceD(data.priceD);
        setPriceE(data.priceE);
        setPriceF(data.priceF);
      };

      fetching();
    } else {
      history("/");
    }
  }, [params.id, userInfo, history]);

  useEffect(() => {
    if (
      priceA ||
      seats.quantityA ||
      priceB ||
      seats.quantityB ||
      priceC ||
      seats.quantityC ||
      priceD ||
      seats.quantityD ||
      priceE ||
      seats.quantityE ||
      priceF ||
      seats.quantityF
    ) {
      setSubtotal(
        priceRow(priceA, seats.quantityA) +
          priceRow(priceB, seats.quantityB) +
          priceRow(priceC, seats.quantityC) +
          priceRow(priceD, seats.quantityD) +
          priceRow(priceE, seats.quantityE) +
          priceRow(priceF, seats.quantityF)
      );

      // setSeatsAval(seatsAval - totalSeats);
    }
  }, [
    priceA,
    seats.quantityA,
    priceB,
    seats.quantityB,
    priceC,
    seats.quantityC,
    priceD,
    seats.quantityD,
    priceE,
    seats.quantityE,
    priceF,
    seats.quantityF,
  ]);

  useEffect(() => {
    // setTax(TAX_RATE * subTotal);
    if (subTotal) {
      console.log(subTotal);
      setTotalAmount(subTotal);
      if (subTotal > 0) {
        isBooking = true;
      }
    }
  }, [subTotal]);

  const calc_total = (newValues) => {
    const newTotal =
      parseInt(newValues.quantityA) +
      parseInt(newValues.quantityB) +
      parseInt(newValues.quantityC) +
      parseInt(newValues.quantityD) +
      parseInt(newValues.quantityE) +
      parseInt(newValues.quantityF);

    // console.log("newTotal", newTotal);

    const newAvalSeats = seatsAval - newTotal;
    // console.log("newAvalSeats", newAvalSeats);
    setTotalSeats(newTotal);
  };

  const total_handler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const newValues = {
      ...seats,
      [name]: value,
    };
    setSeats(newValues);

    // Calling the method to sum the value
    calc_total(newValues);
  };

  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    if (!totalAmount) return;

    dispatch(
      createBillAction(
        totalAmount,
        seats.quantityA,
        seats.quantityB,
        seats.quantityC,
        seats.quantityD,
        seats.quantityE,
        seats.quantityF,
        postId,
        tourName,
        tourCode,
        startAt
      )
    );
    if (seatsAval) {
      const aseats = seatsAval - totalSeats;
      dispatch(seatUpdateAction(postId, aseats));
    }

    // if (userInfo.isAdmin === false) {
    //   navigate("/posts");
    // } else {
    //   navigate("/posts");
    // }
    setPopup({
      openPopup: true,
      setOpenPopup: "",
      title: "success",
      children: "จองสำเร็จ! ขอบคุณที่ทำการจองทัวร์กับเรา",
    });
  };

  const [popup, setPopup] = useState({
    openPopup: false,
    setOpenPopup: "",
    title: "",
    children: "",
  });

  const billCreate = useSelector((state) => state.billCreate);
  const { success, loading } = billCreate;

  // useEffect(() => {
  //   if (success === true) {
  //     setPopup({
  //       openPopup: true,
  //       setOpenPopup: "",
  //       title: "success",
  //       children: "จองสำเร็จ! ขอบคุณที่ทำการจองทัวร์กับเรา",
  //     });
  //   }
  // }, [success]);

  return (
    <Card>
      <CardMedia component="img" alt={tourName} image={featuredImage} />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom component="div">
            Periodอื่นๆ
          </Typography>
          <Suspense fallback={<Loading />}>
            <TourCode tourCode={tourCode} />
          </Suspense>
        </Box>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {tourName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {highlight}
          </Typography>
        </Box>
        <Box sx={{ width: { md: "50%", xs: "100%" }, mx: "auto" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="">
              <TableHead sx={{ backgroundColor: "#002855" }}>
                <TableRow>
                  <TableCell align="center">&nbsp;</TableCell>
                  <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <DeveloperModeRoundedIcon /> รหัสโปรแกรม
                  </TableCell>
                  <TableCell align="left">{tourCode}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <LocationOnRoundedIcon /> ประเทศ
                  </TableCell>
                  <TableCell align="left">{country}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <DateRangeRoundedIcon /> Period
                  </TableCell>
                  <TableCell align="left">
                    {moment(startAt).format("dddd DD-MM-YYYY")} -{" "}
                    {moment(endAt).format("dddd DD-MM-YYYY")}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <ConfirmationNumberRoundedIcon /> จำนวนที่นั่ง
                  </TableCell>
                  <TableCell align="left">
                    {seatsCl} + {seatsGu}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <ConfirmationNumberRoundedIcon /> จำนวนที่นั่งคงเหลือ
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={seatsAval === 0 ? "เต็ม" : seatsAval}
                      color={seatsAval === 0 ? "danger" : "success"}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <PictureAsPdfRoundedIcon /> PDF file
                  </TableCell>
                  <TableCell align="left">
                    <Link href={pdfFile} target="_blank" download>
                      download
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <UploadFileRoundedIcon /> WORD file
                  </TableCell>
                  <TableCell align="left">
                    <Link href={wordFile} underline="hover">
                      download
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <ControlPointDuplicateRoundedIcon /> ค่าคอม
                  </TableCell>
                  <TableCell align="left">
                    {commission} + {comSales}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ width: { md: "70%", xs: "100%" }, mx: "auto" }}>
          {pdfFile && (
            <iframe
              src={`${pdfFile}#toolbar=0`}
              width="100%"
              height="700px"
            ></iframe>
          )}
        </Box>

        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#002855" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "white" }}>
                    ลักษณะห้องพัก
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    ราคา
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    จำนวน
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    ราคารวม
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
                    {priceA.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityA"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceA, seats.quantityA).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (เสริมเตียง)
                  </TableCell>
                  <TableCell align="center">
                    {priceB.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityB"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceB, seats.quantityB).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (ไม่เสริมเตียง)
                  </TableCell>
                  <TableCell align="center">
                    {priceC.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityC"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceC, seats.quantityC).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    พักเดี่ยว
                  </TableCell>
                  <TableCell align="center">
                    {priceD.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityD"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceD, seats.quantityD).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กทารก ( Infant)
                  </TableCell>
                  <TableCell align="center">
                    {priceE.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityE"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceE, seats.quantityE).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ไม่มีตั๋วเครื่องบิน (Join Land)
                  </TableCell>
                  <TableCell align="center">
                    {priceF.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsAval, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="quantityF"
                      onChange={total_handler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceF, seats.quantityF).toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow> */}
                {/* <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{tax.toFixed(2)}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align="right">
                    {totalAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button
                      color="success"
                      variant="contained"
                      onClick={handleBook}
                      disabled={!isBooking}
                    >
                      จอง
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
      <NotiPopup popup={popup} setPopup={setPopup} />
    </Card>
  );
};

export default Post;

function priceRow(qty, unit) {
  return qty * unit;
}
