import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postsActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

const AllPost = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts, error } = allPosts;
  console.log(allposts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <Row xs={1} md={3} className="allPosts g-4 mx-5">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {allposts &&
        allposts.map((post) => (
          <Col>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default AllPost;
