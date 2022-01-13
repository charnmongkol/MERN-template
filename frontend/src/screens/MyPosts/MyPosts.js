import React, { useEffect, useState } from "react";
import { Accordion, Badge, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, listPosts } from "../../actions/postsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyPosts = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const postList = useSelector((state) => state?.postList);
  const { loading, posts, error } = postList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //taking state hook/ change if post created
  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate } = postCreate;

  //changeif post updated
  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //delete operation
      dispatch(deletePostAction(id));
    }
  };
  // console.log(posts);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listPosts());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`${userInfo.name} Posts`}>
      <Row className="my-3 align-items-center">
        <Col>
          <Link to="/createpost" className="btn btn-primary">
            <div size="lg">Create a new post</div>
          </Link>
        </Col>
        <Col>
          <Form>
            <FormControl
              type="search"
              placeholder="Search Category"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row className="gap-3">
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {posts &&
          posts
            ?.reverse()
            .filter((filteredPost) => filteredPost.category.includes(search))
            .map((note) => (
              <Accordion key={note._id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      {note.title}
                    </span>
                    <div>
                      <a
                        className="btn btn-secondary"
                        href={`/editpost/${note._id}`}
                      >
                        Edit
                      </a>
                      <div
                        variant="danger"
                        className="mx-2 btn btn-danger"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <h4>
                      <Badge bg="success">Category - {note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
      </Row>
    </MainScreen>
  );
};

export default MyPosts;
