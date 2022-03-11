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

const CreatePost2 = () => {
  //create state for fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [commission, setCommission] = useState("");
  const [seats, setSeats] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [priceC, setPriceC] = useState("");
  const [priceD, setPriceD] = useState("");
  const [priceE, setPriceE] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [fileMessage, setFileMessage] = useState(null);

  console.log(category);
  //taking dispatch hook
  const dispatch = useDispatch();

  //taking state hook
  const postCreate = useSelector((state) => state.postCreate);
  //taking loading,error,post from inside of postCreate state
  const { loading, error, post } = postCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setCode("");
    setCommission("");
    setEndAt("");
    setStartAt("");
    setSeats("");
    setPdfFile("");
    setFeaturedImage("");
    setPriceA("");
    setPriceB("");
    setPriceC("");
    setPriceD("");
    setPriceE("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !title ||
      !content ||
      !category ||
      !code ||
      !startAt ||
      !endAt ||
      !commission ||
      !seats ||
      !pdfFile ||
      !featuredImage ||
      !priceA ||
      !priceB ||
      !priceC ||
      !priceD ||
      !priceE
    )
      return;
    dispatch(
      createPostAction(
        title,
        content,
        category,
        code,
        startAt,
        endAt,
        commission,
        seats,
        pdfFile,
        featuredImage,
        priceA,
        priceB,
        priceC,
        priceD,
        priceE
      )
    );

    resetHandler();
    navigate("/myposts");
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
          setFeaturedImage(data.url.toString());
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
          setPdfFile(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setFileMessage("Please select a PDF file.");
    }
  };

  useEffect(() => {}, []);

  const defaultValue = {
    today: moment().format("YYYY-MM-DD"),
  };

  // const handleChangeCountry = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCategory(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

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
                <Grid item md={8}>
                  <TextField
                    fullWidth
                    label="ชื่อโปรแกรมทัวร์"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    label="รหัสโปรแกรม"
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันออกเดินทาง"
                    variant="outlined"
                    defaultValue={defaultValue.today}
                    onChange={(e) => setStartAt(e.target.value)}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันกลับ"
                    variant="outlined"
                    defaultValue={defaultValue.today}
                    onChange={(e) => setEndAt(e.target.value)}
                  />
                </Grid>
                <Grid item md={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      sx={{ flex: 1 }}
                      fullWidth
                      id="input-with-icon-textfield"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddPhotoAlternateIcon />
                          </InputAdornment>
                        ),
                      }}
                      type="file"
                      label="รูปหน้าปก"
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
                <Grid item md={12}>
                  <TextField
                    label="เนื้อหาคร่าวๆ"
                    fullWidth
                    multiline
                    minRows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ประเทศ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Age"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {countries.map((item) => (
                        <MenuItem key={item.code} value={item.label}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      ประเทศ
                    </InputLabel>
                    <Select
                      id="demo-multiple-checkbox"
                      multiple
                      value={category}
                      onChange={handleChangeCountry}
                      input={<OutlinedInput label="ประเทศ" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {countries.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                          <Checkbox
                            checked={category.indexOf(item.label) > -1}
                          />
                          <ListItemText primary={item.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    label="จำนวนที่นั่ง"
                    variant="outlined"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    label="ค่านายหน้า(บาท)"
                    variant="outlined"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    sx={{ flex: 1 }}
                    fullWidth
                    id="input-with-icon-textfield"
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
                </Grid>
                <Grid item md={8}>
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
                              fullWidth
                              label="ราคา"
                              value={priceA}
                              onChange={(e) => setPriceA(e.target.value)}
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
                              onChange={(e) => setPriceB(e.target.value)}
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
                              onChange={(e) => setPriceC(e.target.value)}
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
                              onChange={(e) => setPriceD(e.target.value)}
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
                              onChange={(e) => setPriceE(e.target.value)}
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
          <CardActions>
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

export default CreatePost2;
