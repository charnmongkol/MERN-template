import { Box } from "@mui/material";
import { Container } from "@mui/material";
import React, { lazy } from "react";
import bg from "../../assets/logos/Banner1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getHighlightPosts } from "../../redux/actions/postsActions";
import { useEffect } from "react";
import { Link } from "@mui/material";

const Banner = () => {
  const dispatch = useDispatch();
  const highlightPosts = useSelector((state) => state.highlightPosts);
  const { loading, error, highlights } = highlightPosts;

  useEffect(() => {
    dispatch(getHighlightPosts());
  }, []);

  return (
    <Container maxWidth={false} sx={{ mt: "90px" }}>
      <Swiper
        rewind={true}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box
            sx={{
              height: { md: "85vh", sm: "60vh", xs: "400px" },
            }}
          >
            <img src={bg} />
          </Box>
        </SwiperSlide>
        {highlights?.length > 0 &&
          highlights.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: { md: "85vh", sm: "60vh", xs: "400px" },
                }}
              >
                <Link href={`/posts/${item._id}`}>
                  <img src={item.featuredImage} />
                </Link>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Banner;
