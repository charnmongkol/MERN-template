import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "../../components/Controls/Input";
import Select from "../../components/Controls/Select";
import React from "react";
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/userActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonGenerator from "../../components/Controls/Button";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "../../components/Header/AppBar";

const Footer = lazy(() => import("../../components/Footer/Footer"));

const Registration = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseStart, setLicenseStart] = useState("");
  const [licenseEnd, setLicenseEnd] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [licensePic, setLicensePic] = useState("");
  const [zone, setZone] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  // console.log(zone);

  const dispatch = useDispatch();

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, userInfo } = userRegistration;

  //password
  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (userInfo) {
      history("/myposts");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("sub");
    console.log(
      name,
      email,
      password.password,
      licenseNumber,
      licenseStart,
      licenseEnd,
      address,
      phoneNumber,
      website,
      pic,
      licensePic,
      zone
    );
    if (password.password !== confirmpassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        register(
          name,
          email,
          password.password,
          licenseNumber,
          licenseStart,
          licenseEnd,
          address,
          phoneNumber,
          website,
          pic,
          licensePic,
          zone
        )
      );
    }
  };

  //image uploading
  const postDetails = (pics) => {
    // console.log(pics);
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "topoftheworld");
      data.append("cloud_name", "duby6v8jo");

      fetch("https://api.cloudinary.com/v1_1/duby6v8jo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image.");
    }
  };

  const licenseUpload = (license) => {
    if (!license) {
      return setPicMessage("โปรดเลือกรูปภาพใบอนุญาตของคุณ");
    }
    setPicMessage(null);

    if (license.type === "image/jpeg" || license.type === "image/png") {
      const data = new FormData();
      data.append("file", license);
      data.append("upload_preset", "topoftheworld");
      data.append("cloud_name", "duby6v8jo");

      fetch("https://api.cloudinary.com/v1_1/duby6v8jo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLicensePic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("ใส่ได้เฉพาะ .jpeg หรือ .png");
    }
  };

  return (
    <Container maxWidth="lg">
      <ResponsiveAppBar />
      <Paper elevation={10} sx={{ mt: "100px", flexGrow: 1, p: 4 }}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" component="h2">
                สมัครเป็นAgent
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Input
                label="ชื่อ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Input
                label="อีเมลล์"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  รหัสผ่าน
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? "text" : "password"}
                  value={password.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="รหัสผ่าน"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="ยืนยันรหัสผ่าน"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="เลขที่ใบอนุญาต"
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="วันที่ออกใบอนุญาต"
                type="date"
                value={licenseStart}
                onChange={(e) => setLicenseStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="วันที่หมดอายุใบอนุญาต"
                type="date"
                value={licenseEnd}
                onChange={(e) => setLicenseEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="เบอร์โทรศัพท์"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="เว็บไซด์"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Input
                label="ที่อยู่บริษัท"
                type="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                multiline
                rows="2"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Select
                label="ภาค"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                options={zoneOpts}
              />
              <FormHelperText>บริษัทตั้งอยู่ที่ภูมิภาคใด</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  โลโก้บริษัท
                </Typography>
                <Input
                  type="file"
                  label="โลโก้บริษัท"
                  onChange={(e) => postDetails(e.target.files[0])}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ border: 1, width: "max-content", mx: "auto", my: 2 }}>
                {pic && (
                  <img
                    src={pic}
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  รูป License (ตัวจริง)
                </Typography>
                <Input
                  type="file"
                  label="โลโก้บริษัท"
                  onChange={(e) => licenseUpload(e.target.files[0])}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ border: 1, width: "max-content", mx: "auto", my: 2 }}>
                {licensePic && (
                  <img
                    src={licensePic}
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button color="primary" variant="contained" type="submit">
                สมัคร
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default Registration;

const zoneOpts = [
  { value: "c", title: "ภาคกลาง" },
  { value: "n", title: "ภาคเหนือ" },
  { value: "s", title: "ภาคใต้" },
  { value: "e", title: "ภาคตะวันออก" },
  { value: "w", title: "ภาคตะวันตก" },
  { value: "isan", title: "ภาคอีสาน" },
];
