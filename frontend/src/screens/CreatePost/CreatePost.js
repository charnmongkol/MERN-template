import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../actions/postsActions";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

const CreatePost = () => {
  //create state for fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  //taking dispatch hook
  const dispatch = useDispatch();

  //taking state hook
  const postCreate = useSelector((state) => state.postCreate);
  //taking loading,error,post from inside of postCreate state
  const { loading, error, post } = postCreate;

  console.log(post);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createPostAction(title, content, category));

    resetHandler();
    navigate("/myposts");
  };

  useEffect(() => {}, []);
  return (
    <MainScreen title="Create a Post">
      <Card>
        <Card.Header>Create a new Post</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={content}
                placeholder="Enter the content"
                row={4}
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
                type="category"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
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
