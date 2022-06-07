import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/actions/postsActions";
import Loading from "../../components/Loading";

import ErrorMessage from "../../components/ErrorMessage";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputAdornment from "@mui/material/InputAdornment";
import CardMedia from "@mui/material/CardMedia";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import countries from "../../conf/countries.json";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreatePost = () => {
  //create state for fields
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
  const [seatsAval, setSeatsAval] = useState(seatsCl);
  const [pdfFile, setPdfFile] = useState("");
  const [wordFile, setWordFile] = useState(null);
  const [featuredImage, setFeaturedImage] = useState("");
  const [priceA, setPriceA] = useState(0);
  const [priceB, setPriceB] = useState(0);
  const [priceC, setPriceC] = useState(0);
  const [priceD, setPriceD] = useState(0);
  const [priceE, setPriceE] = useState(0);
  const [priceF, setPriceF] = useState(0);
  const [picMessage, setPicMessage] = useState(null);
  const [fileMessage, setFileMessage] = useState(null);

  // console.log(wordFile);
  //taking dispatch hook
  const dispatch = useDispatch();

  //taking state hook
  const postCreate = useSelector((state) => state.postCreate);
  //taking loading,error,post from inside of postCreate state
  const { loading, error, post } = postCreate;

  const resetHandler = () => {
    setTourName("");
    setTourCode("");
    setHighlight("");
    setCountry([[]]);
    setCommission("");
    setComSales("");
    setSeatsCl("");
    setSeatsGu("");
    setEndAt("");
    setStartAt("");
    setWordFile("");
    setPdfFile("");
    setFeaturedImage("");
    setPriceA("");
    setPriceB("");
    setPriceC("");
    setPriceD("");
    setPriceE("");
    setPriceF("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!tourName || !tourCode) return;
    dispatch(
      createPostAction(
        tourName,
        tourCode,
        highlight,
        country,
        startAt,
        endAt,
        commission,
        comSales,
        seatsCl,
        seatsGu,
        seatsAval,
        pdfFile,
        wordFile,
        featuredImage,
        priceA,
        priceB,
        priceC,
        priceD,
        priceE,
        priceF
      )
    );

    resetHandler();
    navigate("/admin/myposts");
  };

  const uploadFeaturedImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const image = new FormData();
      image.append("file", pics);
      image.append("upload_preset", "topoftheworld");
      image.append("cloud_name", "duby6v8jo");

      fetch("https://api.cloudinary.com/v1_1/duby6v8jo/image/upload", {
        method: "post",
        body: image,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFeaturedImage(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  const uploadFile = (pdf) => {
    if (pdf.type === "application/pdf") {
      // console.log("filePDF", pdf);

      const data = new FormData();
      data.append("file", pdf);
      data.append("upload_preset", "topoftheworld");
      data.append("cloud_name", "duby6v8jo");

      fetch("https://api.cloudinary.com/v1_1/duby6v8jo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPdfFile(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setFileMessage("โปรดเลือก pdf ไฟล์");
    }
  };

  const uploadWordFile = (docx) => {
    const data = new FormData();
    data.append("file", docx);
    data.append("upload_preset", "topoftheworld");
    data.append("cloud_name", "duby6v8jo");

    fetch("https://api.cloudinary.com/v1_1/duby6v8jo/raw/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWordFile(data.secure_url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSeatsAval(seatsCl);
  }, [seatsCl]);

  const defaultValue = {
    today: moment().format("YYYY-MM-DD"),
  };

  const handleChangeCountry = (event) => {
    const {
      target: { value },
    } = event;
    setCountry(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/,/g, "");

  const handleCommaNumberA = (e) => {
    setPriceA(e.target.value);
  };
  const handleCommaNumberB = (e) => {
    setPriceB(e.target.value);
  };
  const handleCommaNumberC = (e) => {
    setPriceC(e.target.value);
  };
  const handleCommaNumberD = (e) => {
    setPriceD(e.target.value);
  };
  const handleCommaNumberE = (e) => {
    setPriceE(e.target.value);
  };
  const handleCommaNumberF = (e) => {
    setPriceF(e.target.value);
  };

  return (
    <DashboardLayOut title="เพิ่มโปรแกรมทัวร์">
      <form autoComplete="off" onSubmit={submitHandler}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    label="ชื่อโปรแกรมทัวร์"
                    variant="outlined"
                    required
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="รหัสโปรแกรม"
                    variant="outlined"
                    required
                    value={tourCode}
                    onChange={(e) => setTourCode(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันออกเดินทาง"
                    variant="outlined"
                    required
                    defaultValue={defaultValue.today}
                    onChange={(e) => setStartAt(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันกลับ"
                    variant="outlined"
                    required
                    defaultValue={defaultValue.today}
                    onChange={(e) => setEndAt(e.target.value)}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      sx={{ flex: 1 }}
                      fullWidth
                      id="input-with-icon-textfield"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddPhotoAlternateIcon />
                          </InputAdornment>
                        ),
                      }}
                      type="file"
                      label="รูปหน้าปก ไม่เกิน 1000KB / 1MB"
                      onChange={(e) => uploadFeaturedImage(e.target.files[0])}
                    />

                    <Card variant="outlined" sx={{ flex: 1 }}>
                      {featuredImage && (
                        <CardMedia
                          component="img"
                          height="400px"
                          image={featuredImage}
                          alt="Image preview"
                          sx={{ objectFit: "cover" }}
                        />
                      )}
                    </Card>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="ไฮไลท์ทัวร์"
                    fullWidth
                    multiline
                    minRows={4}
                    required
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      ประเทศ
                    </InputLabel>
                    <Select
                      id="demo-multiple-checkbox"
                      multiple
                      value={country}
                      required
                      onChange={handleChangeCountry}
                      input={<OutlinedInput label="ประเทศ" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {countries.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                          <Checkbox
                            checked={country.indexOf(item.label) > -1}
                          />
                          <ListItemText primary={item.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="จำนวนที่นั่งลูกค้า"
                    variant="outlined"
                    required
                    value={seatsCl}
                    onChange={(e) => setSeatsCl(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="จำนวนที่นั่งไกด์"
                    variant="outlined"
                    required
                    value={seatsGu}
                    onChange={(e) => setSeatsGu(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="ค่าคอมบริษัท"
                    variant="outlined"
                    required
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="ค่าคอมเซลล์"
                    variant="outlined"
                    required
                    value={comSales}
                    onChange={(e) => setComSales(e.target.value)}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    sx={{ flex: 1 }}
                    fullWidth
                    id="input-with-icon-textfield"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PictureAsPdfRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    type="file"
                    label="PDF ไฟล์"
                    onChange={(e) => uploadFile(e.target.files[0])}
                  />
                  <FormHelperText id="filled-weight-helper-text">
                    ไฟล์ .pdf ไม่เกิน 10MB
                  </FormHelperText>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    sx={{ flex: 1 }}
                    fullWidth
                    id="input-with-icon-textfield"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PictureAsPdfRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    type="file"
                    label="Word file"
                    onChange={(e) => uploadWordFile(e.target.files[0])}
                  />
                  <FormHelperText id="filled-weight-helper-text">
                    ไฟล์ word.docx ไม่เกิน 10MB
                  </FormHelperText>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ประเภท</TableCell>
                          <TableCell align="center">ราคา&nbsp;(บาท)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            ผู้ใหญ่พัก 2 ท่าน
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              type="text"
                              name="priceA"
                              fullWidth
                              label="ราคา"
                              value={priceA}
                              onChange={handleCommaNumberA}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน (เสริมเตียง)
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              label="ราคา"
                              value={priceB}
                              onChange={handleCommaNumberB}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            เด็กอายุ 2-12 ปี พักกับผู้ใหญ่ 2 ท่าน
                            (ไม่เสริมเตียง)
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              label="ราคา"
                              value={priceC}
                              onChange={handleCommaNumberC}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            พักเดีี่ยว
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              label="ราคา"
                              value={priceD}
                              onChange={handleCommaNumberD}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            เด็กทารก (Infant)
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              label="ราคา"
                              value={priceE}
                              onChange={handleCommaNumberE}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            ไม่มีตั๋วเครื่องบิน (Join Land)
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              label="ราคา"
                              value={priceF}
                              onChange={handleCommaNumberF}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button color="success" variant="contained" type="submit">
              Create Note
            </Button>
            <Button onClick={resetHandler} color="error" variant="outlined">
              Reset Feilds
            </Button>
          </CardActions>
        </Card>
      </form>
    </DashboardLayOut>
  );
};

export default CreatePost;
