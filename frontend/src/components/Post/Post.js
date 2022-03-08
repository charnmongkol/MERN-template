import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Post.css";
import { Col, Row, Table } from "react-bootstrap";
import {
  AiFillEnvironment,
  AiFillFilePdf,
  AiOutlineFieldTime,
  AiOutlineShake,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const Post = () => {
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
    } else {
      history("/");
    }
  }, [params.id, date]);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {featuredImage && (
          <img src={featuredImage} alt={title} className="singlePostImg" />
        )}

        <h1 className="singlePostTitle">{title}</h1>

        <div className="singlePostInfo">
          <Row className="w-50">
            <Col sm={12} className="headBorderLeft">
              &nbsp;
            </Col>

            <Col sm={4}>
              <AiFillEnvironment></AiFillEnvironment>
            </Col>
            <Col sm={8}>{category}</Col>

            <Col sm={4}>
              <AiOutlineFieldTime></AiOutlineFieldTime>
            </Col>
            <Col sm={8}>
              {" "}
              <span className="text-white">
                {moment(startAt).format("YYYY-MM-DD")} -{" "}
                {moment(endAt).format("YYYY-MM-DD")}
              </span>
            </Col>

            <Col sm={4}>
              <AiOutlineShake></AiOutlineShake>
            </Col>
            <Col sm={8}>{seats}</Col>
          </Row>
        </div>

        <p className="singlePostDesc">{content}</p>

        <div className="mb-2 text-end">
          <a
            className="btn btn-danger"
            href={pdfFile}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <AiFillFilePdf color="red" size={40}></AiFillFilePdf>
          </a>
        </div>
        <div>
          <img
            src={pdfFile.replace(".pdf", ".png")}
            alt={title}
            className="pdfPic m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
