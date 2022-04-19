import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";
import axios from "axios";
import {
  createPostAction,
  getAllPosts,
} from "../../redux/actions/postsActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GoBack from "../../components/GoBack/GoBack";
import moment from "moment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputAdornment from "@mui/material/InputAdornment";
import CardMedia from "@mui/material/CardMedia";
import OutlinedInput from "@mui/material/OutlinedInput";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const CreatePostByCode = () => {
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
  const [wordFile, setWordFile] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceB, setPriceB] = useState("");
  const [priceC, setPriceC] = useState("");
  const [priceD, setPriceD] = useState("");
  const [priceE, setPriceE] = useState("");
  const [priceF, setPriceF] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [fileMessage, setFileMessage] = useState(null);
  const [tourID, setTourID] = useState("");

  // console.log("pdfFile", wordFile);
  const [inputs, setInputs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPosts = useSelector((state) => state?.allPosts);
  const { loading: lodingAllposts, allposts } = allPosts;
  // console.log(allposts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (allposts) {
      setInputs(allposts);
    }
  }, [allposts]);
  const postCreate = useSelector((state) => state.postCreate);
  //taking loading,error,post from inside of postCreate state
  const { loading: loadingCreating, error, post } = postCreate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${tourID}`);
      // console.log(data);
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

    if (tourID) {
      fetching();
    }
  }, [tourID]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!tourName) return;
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

    navigate("/admin/myposts");
  };

  useEffect(() => {
    setSeatsAval(seatsCl);
  }, [seatsCl]);
  // console.log(seatsAval);

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
        setWordFile(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(
  //   tourName,
  //   tourCode,
  //   highlight,
  //   country,
  //   startAt,
  //   endAt,
  //   commission,
  //   comSales,
  //   seatsCl,
  //   seatsGu,
  //   pdfFile,
  //   wordFile,
  //   featuredImage,
  //   priceA,
  //   priceB,
  //   priceC,
  //   priceD,
  //   priceE,
  //   priceF
  // );

  const tourCodeOptions = inputs.filter(
    (ele, ind) =>
      ind === inputs.findIndex((elem) => elem.tourCode === ele.tourCode)
  );

  return (
    <DashboardLayOut title="เพิ่มโปรแกรมทัวร์">
      <Box marginY={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            รหัสโปรแกรมทัวร์
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tourID}
            label="รหัสโปรแกรมทัวร์"
            onChange={(e) => setTourID(e.target.value)}
          >
            {tourCodeOptions.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.tourCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper>
        <form autoComplete="on" onSubmit={submitHandler}>
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
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      label="รหัสโปรแกรม"
                      variant="outlined"
                      value={tourCode}
                      onChange={(e) => setTourCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      type="date"
                      label="วันออกเดินทาง"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={moment(startAt).format("YYYY-MM-DD")}
                      onChange={(e) => setStartAt(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      type="date"
                      label="วันกลับ"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={moment(endAt).format("YYYY-MM-DD")}
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
                      label="ไฮไลท์ทัวร์"
                      fullWidth
                      multiline
                      minRows={4}
                      value={highlight}
                      onChange={(e) => setHighlight(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">
                        ประเทศ
                      </InputLabel>
                      <Select
                        id="demo-multiple-checkbox"
                        multiple
                        value={country}
                        input={<OutlinedInput label="ประเทศ" />}
                        renderValue={(selected) => selected.join(", ")}
                      ></Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      label="จำนวนที่นั่งลูกค้า"
                      variant="outlined"
                      value={seatsCl}
                      onChange={(e) => setSeatsCl(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      label="จำนวนที่นั่งไกด์"
                      variant="outlined"
                      value={seatsGu}
                      onChange={(e) => setSeatsGu(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      label="ค่าคอมบริษัท"
                      variant="outlined"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      label="ค่าคอมเซลล์"
                      variant="outlined"
                      value={comSales}
                      onChange={(e) => setComSales(e.target.value)}
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
                  <Grid item md={12}>
                    <TextField
                      sx={{ flex: 1 }}
                      fullWidth
                      id="input-with-icon-textfield"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UploadFileRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      type="file"
                      label="Word file"
                      onChange={(e) => uploadWordFile(e.target.files[0])}
                    />
                  </Grid>
                  <Grid item md={8}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>ประเภท</TableCell>
                            <TableCell align="center">
                              ราคา&nbsp;(บาท)
                            </TableCell>
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
                          <TableRow>
                            <TableCell component="th" scope="row">
                              ไม่มีตั๋วเครื่องบิน (Join Land)
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                fullWidth
                                label="ราคา"
                                value={priceF}
                                onChange={(e) => setPriceF(e.target.value)}
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
                บันทึก
              </Button>
            </CardActions>
          </Card>
        </form>
      </Paper>
    </DashboardLayOut>
  );
};

export default CreatePostByCode;
