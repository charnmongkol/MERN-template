import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Form, FormControl } from "react-bootstrap";
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
  console.log(posts);

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
    <MainScreen title={`Welcome Back ${userInfo.name}`}>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Link to="/createpost">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create a new post
        </Button>
      </Link>
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
                    <Button href={`/post/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
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
    </MainScreen>
  );
};

export default MyPosts;
