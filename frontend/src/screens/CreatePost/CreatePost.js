import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/actions/postsActions";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
// import ReactMarkdown from "react-markdown";

const CreatePost = () => {
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
  const [picMessage, setPicMessage] = useState(null);
  const [fileMessage, setFileMessage] = useState(null);

  //taking dispatch hook
  const dispatch = useDispatch();

  //taking state hook
  const postCreate = useSelector((state) => state.postCreate);
  //taking loading,error,post from inside of postCreate state
  const { loading, error, post } = postCreate;

  // console.log(post);

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
      !featuredImage
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
        featuredImage
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
  return (
    <MainScreen title="Create a Post">
      <Card>
        <Card.Body>
          <Form onSubmit={submitHandler} className="d-flex flex-column gap-3">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>ชื่อโปรแกรม</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="ชื่อโปรแกรม"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="code">
              <Form.Label>รหัสโปรแกรม</Form.Label>
              <Form.Control
                type="text"
                value={code}
                placeholder="รหัสโปรแกรม"
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Row xs={1} md={2}>
              <div>
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <div className="previewImageBox">
                  <img src={featuredImage} className="img-preview m-auto" />
                </div>
                <Form.Group controlId="featuredImage">
                  <Form.Label>รูปหน้าปก</Form.Label>
                  <Form.Control
                    type="file"
                    label="รูปหน้าปก"
                    onChange={(e) => uploadFeaturedImage(e.target.files[0])}
                  />
                </Form.Group>
              </div>
              <div>
                {fileMessage && (
                  <ErrorMessage variant="danger">{fileMessage}</ErrorMessage>
                )}
                <div className="previewImageBox">
                  <img
                    src={pdfFile.replace(".pdf", ".png")}
                    className="img-preview m-auto"
                  />
                </div>
                <Form.Group controlId="pdfFile">
                  <Form.Label>PDF File</Form.Label>
                  <Form.Control
                    type="file"
                    label="Upload PDF file"
                    onChange={(e) => uploadFile(e.target.files[0])}
                  />
                </Form.Group>
              </div>
            </Row>

            <Row xs={1} md={2}>
              <Form.Group controlId="startAt">
                <Form.Label>วันที่ออกเดินทาง</Form.Label>
                <Form.Control
                  type="date"
                  value={startAt}
                  placeholder="วันที่ออกเดินทาง"
                  onChange={(e) => setStartAt(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="endAt">
                <Form.Label>วันที่กลับ</Form.Label>
                <Form.Control
                  type="date"
                  value={endAt}
                  placeholder="วันที่กลับ"
                  onChange={(e) => setEndAt(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="content">
              <Form.Label>รายละเอียดคร่าวๆ</Form.Label>
              <Form.Control
                type="textarea"
                value={content}
                placeholder="รายละเอียดคร่าวๆ"
                row={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {/* {content && (
              <Card>
                <Card.Header>Post Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )} */}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="category"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="seats">
              <Form.Label>จำนวนที่นั่ง</Form.Label>
              <Form.Control
                type="text"
                value={seats}
                placeholder=""
                onChange={(e) => setSeats(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="commission">
              <Form.Label>ค่าคอม</Form.Label>
              <Form.Control
                type="text"
                value={commission}
                placeholder=""
                onChange={(e) => setCommission(e.target.value)}
              />
            </Form.Group>

            <Row xs={1} md={2}>
              {loading && <Loading size={50} />}
              <Col></Col>
              <Col className="text-end">
                <Button type="submit" variant="primary" className="mx-3">
                  Create Note
                </Button>
                <Button onClick={resetHandler} variant="danger">
                  Reset Feilds
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreatePost;
