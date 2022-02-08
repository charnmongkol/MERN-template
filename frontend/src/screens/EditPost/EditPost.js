import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import {
  deletePostAction,
  updatePostAction,
} from "../../redux/actions/postsActions";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";
import moment from "moment";

const EditPost = () => {
  //craete states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [commission, setCommission] = useState("");
  const [seats, setSeats] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [fileMessage, setFileMessage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading, error } = postUpdate;

  //delete actions
  const postDelete = useSelector((state) => state.postDelete);
  const { loading: loadingDelete, error: errorDelete } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePostAction(id));
    }
    navigate("/myposts");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${params.id}`);
      // console.log(data);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
      setCode(data.code);
      setCommission(data.commission);
      setStartAt(data.startAt);
      setEndAt(data.endAt);
      setSeats(data.seats);
      setFeaturedImage(data.featuredImage);
      setPdfFile(data.pdfFile);
    };

    fetching();
  }, [params.id, date]);

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

  const updateHandler = (e) => {
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
      !featuredImage
    )
      return;
    dispatch(
      updatePostAction(
        params.id,
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

  return (
    <MainScreen title="Edit Post">
      <GoBack />
      <Card>
        <Card.Header>Edit the post</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>ชื่อโปรแกรม</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อโปรแกรม"
                value={title}
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

            <div>
              <img src={featuredImage} alt={title} className="profilePic" />
            </div>
            <Form.Group controlId="featuredImage">
              <Form.Label>เปลี่ยนรูปหน้าปก</Form.Label>
              <Form.Control
                type="file"
                label=""
                onChange={(e) => uploadFeaturedImage(e.target.files[0])}
              />
            </Form.Group>

            <div className="d-flex">
              <Form.Group controlId="startAt">
                <Form.Label>วันที่ออกเดินทาง</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(startAt).format("YYYY-MM-DD")}
                  placeholder="วันที่ออกเดินทาง"
                  onChange={(e) => setStartAt(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="endAt">
                <Form.Label>วันที่กลับ</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(endAt).format("YYYY-MM-DD")}
                  placeholder="วันที่กลับ"
                  onChange={(e) => setEndAt(e.target.value)}
                />
              </Form.Group>
            </div>

            <Form.Group controlId="content">
              <Form.Label>รายละเอียดคร่าวๆ</Form.Label>
              <Form.Control
                as="textarea"
                placeholder=""
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Post Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Cateory"
                value={category}
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

            <Form.Group controlId="pdfFile">
              <Form.Label>PDF File</Form.Label>
              <Form.Control
                type="file"
                label="Upload PDF file"
                onChange={(e) => uploadFile(e.target.files[0])}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button
              variant="danger"
              type="submit"
              className="mx-2"
              onClick={() => deleteHandler(params.id)}
            >
              Delete Post
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {moment(date).format("LL")}
        </Card.Footer>
      </Card>

      <div>
        <img
          src={pdfFile.replace(".pdf", ".png")}
          alt={title}
          className="profilePic"
        />
      </div>
    </MainScreen>
  );
};

export default EditPost;
