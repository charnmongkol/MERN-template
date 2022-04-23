import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

import DashboardLayOut from "../../components/Layout/DashboardLayOut";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseStart, setLicenseStart] = useState("");
  const [licenseEnd, setLicenseEnd] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [licensePic, setLicensePic] = useState("");
  const [zone, setZone] = useState("");
  const [password, setPassword] = useState("");
  const [lineid, setLineid] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  //for calling methods
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();
  //fetch user info to form
  useEffect(() => {
    //check user login
    if (!userInfo) {
      navigate("/");
    } else {
      //populate form
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
      setLicenseNumber(userInfo.licenseNumber);
      setLicenseStart(userInfo.licenseStart);
      setLicenseEnd(userInfo.licenseEnd);
      setAddress(userInfo.address);
      setPhoneNumber(userInfo.phoneNumber);
      setWebsite(userInfo.website);
      setLicensePic(userInfo.licensePic);
      setZone(userInfo.zone);
      setLineid(userInfo.lineid);
    }
  }, [navigate, userInfo]);
  //image uploading to Cloudinary
  const postDetails = (pics) => {
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
          setPic(data.secure_url.toString());
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
          setLicensePic(data.secure_url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("ใส่ได้เฉพาะ .jpeg หรือ .png");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        email,
        password,
        licenseNumber,
        licenseStart,
        licenseEnd,
        address,
        phoneNumber,
        website,
        pic,
        licensePic,
        lineid,
      })
    );
  };

  return (
    <DashboardLayOut title="จัดการโปรไฟล์">
      <form autoComplete="off" onSubmit={submitHandler}>
        <Card>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Grid item md={6} xs={12} textAlign="center">
                  <img
                    src={pic}
                    alt={name}
                    className="profilePic"
                    width={200}
                    height={200}
                  />
                </Grid>
                <Grid item md={6} xs={12} textAlign="center">
                  <img
                    src={licensePic}
                    alt={name}
                    className="profilePic"
                    width={200}
                    height={200}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  {loading && <Loading />}
                  {success && (
                    <ErrorMessage variant="success">
                      แก้ไขข้อมูลสำเร็จ
                    </ErrorMessage>
                  )}
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="ชื่อบริษัท"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="อีเมลล์"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="เบอร์โทรศัพท์"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Line ID"
                    variant="outlined"
                    value={lineid}
                    onChange={(e) => setLineid(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="เลขที่ใบอนุญาต"
                    variant="outlined"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันที่ออกใบอนุญาต"
                    variant="outlined"
                    value={moment(licenseStart).format("YYYY-MM-DD")}
                    onChange={(e) => setLicenseStart(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="วันที่ใบอนุญาตหมดอายุ"
                    variant="outlined"
                    value={moment(licenseEnd).format("YYYY-MM-DD")}
                    onChange={(e) => setLicenseEnd(e.target.value)}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="ลิ้งเว็บไซต์"
                    variant="outlined"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="file"
                    label="อัพโหลดรุปโลโก้ใหม่"
                    onChange={(e) => postDetails(e.target.files[0])}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="file"
                    label="อัพโลหดรูปใบอนุญาตนำเที่ยว"
                    onChange={(e) => licenseUpload(e.target.files[0])}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
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
    </DashboardLayOut>
  );
};

export default ProfilePage;
