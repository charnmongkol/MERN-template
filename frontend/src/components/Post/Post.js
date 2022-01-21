import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Post.css";
import pdfIcon from "../../assets/images/pdf-download.svg";

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

  const params = useParams();
  // const dispatch = useDispatch();

  //get data
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${params.id}`);
      console.log(data);
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
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {featuredImage && (
          <img src={featuredImage} alt={title} className="singlePostImg" />
        )}

        <h1 className="singlePostTitle">{title}</h1>

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Category:
            <Link to={"/"} className="link">
              <b> {category}</b>
            </Link>
          </span>
          <div className="singlePostDate ">
            <strong>ระยะเวลา: </strong>
            <span className="text-success">
              {moment(startAt).format("YYYY-MM-DD")} -{" "}
              {moment(endAt).format("YYYY-MM-DD")}
            </span>
          </div>
          <div>
            <strong>จำนวนที่นั่ง: </strong>
            <span className="text-success">{seats}</span>
          </div>
        </div>

        <p className="singlePostDesc">{content}</p>

        <div className="mb-2 text-end">
          <a href={pdfFile} target="_blank" download>
            <img src={pdfIcon}></img>
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
