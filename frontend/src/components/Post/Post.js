import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Post.css";

import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
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
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createBillAction } from "../../redux/actions/billsActions";

const TAX_RATE = 0.07;

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
  const [pdfFile, setPdfFile] = useState("");
  const [wordFile, setWordFile] = useState(" ");
  const [featuredImage, setFeaturedImage] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [priceC, setPriceC] = useState("");
  const [priceD, setPriceD] = useState("");
  const [priceE, setPriceE] = useState("");
  const [priceF, setPriceF] = useState("");
  const [quantityA, setQuantityA] = useState(0);
  const [quantityB, setQuantityB] = useState(0);
  const [quantityC, setQuantityC] = useState(0);
  const [quantityD, setQuantityD] = useState(0);
  const [quantityE, setQuantityE] = useState(0);
  const [quantityF, setQuantityF] = useState(0);

  const [subTotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const params = useParams();
  // const dispatch = useDispatch();
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
    setSubtotal(
      priceRow(priceA, quantityA) +
        priceRow(priceB, quantityB) +
        priceRow(priceC, quantityC) +
        priceRow(priceD, quantityD) +
        priceRow(priceE, quantityE) +
        priceRow(priceF, quantityF)
    );
  }, [
    priceA,
    quantityA,
    priceB,
    quantityB,
    priceC,
    quantityC,
    priceD,
    quantityD,
    priceE,
    quantityE,
    priceF,
    quantityF,
  ]);

  useEffect(() => {
    setTax(TAX_RATE * subTotal);
    setTotalAmount(tax + subTotal);
  }, [subTotal, tax]);

  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    if (!totalAmount) return;

    dispatch(
      createBillAction(
        totalAmount,
        quantityA,
        quantityB,
        quantityC,
        quantityD,
        quantityE,
        quantityF,
        tourCode
      )
    );

    navigate("/agent/dashboard");
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={tourName}
        height="400"
        image={featuredImage}
        sx={{ p: 2 }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="h2" component="h2">
            {tourName}
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="">
              <TableHead sx={{ backgroundColor: "#4dabf5" }}>
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
                    <LocationOnRoundedIcon />
                  </TableCell>
                  <TableCell align="left">{country}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <DateRangeRoundedIcon />
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
                    <ConfirmationNumberRoundedIcon />
                  </TableCell>
                  <TableCell align="left">
                    {seatsCl} + {seatsGu}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <PictureAsPdfRoundedIcon />
                  </TableCell>
                  <TableCell align="left">
                    <Link href={pdfFile} target="_blank" download>
                      download
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <img
            src={pdfFile.replace(".pdf", ".png")}
            alt={tourName}
            width="100%"
          />
        </Box>

        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="">
              <TableHead sx={{ backgroundColor: "#4dabf5" }}>
                <TableRow>
                  <TableCell align="center">ลักษณะห้องพัก</TableCell>
                  <TableCell align="center">ราคา</TableCell>
                  <TableCell align="center">จำนวน</TableCell>
                  <TableCell align="center">ราคมรวม</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ผู้ใหญ่พัก 2 ท่าน
                  </TableCell>
                  <TableCell align="center">{priceA}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityA(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceA, quantityA)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (เสริมเตียง)
                  </TableCell>
                  <TableCell align="center">{priceB}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityB(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceB, quantityB)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (ไม่เสริมเตียง)
                  </TableCell>
                  <TableCell align="center">{priceC}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityC(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceC, quantityC)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    พักเดี่ยว
                  </TableCell>
                  <TableCell align="center">{priceD}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityD(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceD, quantityD)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    เด็กทารก ( Infant)
                  </TableCell>
                  <TableCell align="center">{priceE}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityE(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceE, quantityE)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ไม่มีตั๋วเครื่องบิน (Join Land)
                  </TableCell>
                  <TableCell align="center">{priceF}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { max: seatsCl, min: 0 } }}
                      label="จำนวน"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setQuantityE(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {priceRow(priceF, quantityF)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{tax.toFixed(2)}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{totalAmount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button
                      color="success"
                      variant="contained"
                      onClick={handleBook}
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
    </Card>
  );
};

export default Post;

function priceRow(qty, unit) {
  return qty * unit;
}
