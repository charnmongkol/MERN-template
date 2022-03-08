import React, { useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postsActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";

const AllPost = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts, error } = allPosts;
  // console.log(allposts);

  useEffect(() => {
    dispatch(getAllPosts());
    SwiperCore.use([Navigation]);
  }, [dispatch]);
  return (
    <div className="px-5 position-relative">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="allPostsSwiper"
      >
        {allposts &&
          allposts.map((post) => (
            <SwiperSlide key={post._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={post.featuredImage}
                  height={200}
                  className="objectFit"
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post?.content.substring(0, 110) + "...",
                      }}
                    />
                  </Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      variant="btn btn-outline-info"
                      size="lg"
                      href={`/posts/${post._id}`}
                    >
                      view
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>

      <Row className="my-5 m-auto w-25">
        <Button href="/posts" variant="link" size="sm">
          <h4>All Programs</h4>
        </Button>
      </Row>
    </div>
  );
};

export default AllPost;
