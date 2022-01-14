import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./ProfilePage.css";

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
  const [password, setPassword] = useState("");
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
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image.");
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
      })
    );
  };

  return (
    <MainScreen title="Edit profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">แก้ไขข้อมูลสำเร็จ</ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>ชื่อธุรกิจนำเที่ยว</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อธุรกิจนำเที่ยว"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>อีเมล์</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="อีเมล์"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="on"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lisenceNumber">
                <Form.Label>เลขที่ใบอนุญาต</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เลขที่ใบอนุญาต"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="licenseStart">
                <Form.Label>วันที่ออกใบอนุญาต</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่ออกใบอนุญาต"
                  value={moment(licenseStart).format("YYYY-MM-DD")}
                  onChange={(e) => setLicenseStart(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="licenseEnd">
                <Form.Label>วันที่หมดอายุใบอนุญาต</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่หมดอายุใบอนุญาต"
                  value={moment(licenseEnd).format("YYYY-MM-DD")}
                  onChange={(e) => setLicenseEnd(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>ที่อยู่บริษัท</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อธุรกิจนำเที่ยว"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เบอร์โทร"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="website">
                <Form.Label>ลิ้งเว็บไซต์</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ลิ้งเว็บไซต์"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>รูปโลโก้บริษัท</Form.Label>
                <Form.Control
                  type="file"
                  label="Upload Logo"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="success" className="mt-3">
                Update
              </Button>

              {success && (
                <ErrorMessage variant="success">แก้ไขข้อมูลสำเร็จ</ErrorMessage>
              )}
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
