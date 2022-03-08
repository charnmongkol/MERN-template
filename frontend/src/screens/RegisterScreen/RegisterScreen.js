import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
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
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, userInfo } = userRegistration;

  useEffect(() => {
    if (userInfo) {
      history("/myposts");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(licenseEnd);

    if (password !== confirmpassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          licenseNumber,
          licenseStart,
          licenseEnd,
          address,
          phoneNumber,
          website,
          pic
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
  return (
    <MainScreen title="REGISTRATION">
      <div className="loginConainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
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
          <Row xs={1} md={2}>
            <div>
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
            </div>
            <div>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="on"
                />
              </Form.Group>
            </div>
          </Row>

          <Row md={1}>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}

            <div className="d-flex align-items-center gap-3">
              <Col>
                <Form.Group className="mb-3" controlId="custom-file">
                  <Form.Label>รูปโลโก้บริษัท</Form.Label>
                  <Form.Control
                    type="file"
                    label="Upload Profil Picture"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <Col>
                {pic && (
                  <img
                    src={pic}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      minHeight: "200px",
                    }}
                  />
                )}
              </Col>
            </div>
          </Row>

          <Form.Group className="mb-3" controlId="lisenceNumber">
            <Form.Label>เลขที่ใบอนุญาต</Form.Label>
            <Form.Control
              type="text"
              placeholder="เลขที่ใบอนุญาต"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </Form.Group>

          <Row xs={1} md={2}>
            <div>
              <Form.Group className="mb-3" controlId="licenseStart">
                <Form.Label>วันที่ออกใบอนุญาต</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่ออกใบอนุญาต"
                  value={licenseStart}
                  onChange={(e) => setLicenseStart(e.target.value)}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="licenseEnd">
                <Form.Label>วันที่หมดอายุใบอนุญาต</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่หมดอายุใบอนุญาต"
                  value={licenseEnd}
                  onChange={(e) => setLicenseEnd(e.target.value)}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เบอร์โทร"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>ลิ้งเว็บไซต์</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ลิ้งเว็บไซต์"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
            </div>
          </Row>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>ที่อยู่บริษัท</Form.Label>
            <Form.Control
              type="text"
              placeholder="ที่อยู่บริษัท"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            ยืนยัน
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
