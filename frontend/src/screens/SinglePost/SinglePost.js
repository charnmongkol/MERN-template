import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { deletePostAction, updatePostAction } from "../../actions/postsActions";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";

const SinglePost = () => {
  //craete 4 states
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();

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
    };

    fetching();
  }, [params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    dispatch(updatePostAction(params.id, title, content, category));

    resetHandler();
    navigate("/myposts");
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
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

        <Card.Footer className="text-muted">Updated on - {date}</Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SinglePost;
