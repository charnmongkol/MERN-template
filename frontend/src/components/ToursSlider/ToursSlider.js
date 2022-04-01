import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { useState } from "react";
import { getAllPosts } from "../../redux/actions/postsActions";
import styled from "@emotion/styled";
import { style } from "@mui/system";
import { IconButton } from "@mui/material";
import { Container } from "@mui/material";

const Slider = styled(Container)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonIconRight = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;
const ButtonIconLeft = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const Slide = styled(Box)`
  opacity: 0;
  transition-duration: 1s ease;
  &.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ToursSlider = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts, error } = allPosts;

  const [current, setCurrent] = useState(0);
  const [tours, setTours] = useState("");
  const length = allposts?.length;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  console.log(allposts);
  const nextSlide = (e) => {
    e.preventDefault();
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(allposts) || length <= 0) {
    return null;
  }

  return (
    <Slider maxWidth={false} className="slider">
      <ButtonIconLeft onClick={prevSlide}>
        <ArrowCircleLeftRoundedIcon />
      </ButtonIconLeft>
      <ButtonIconRight onClick={nextSlide}>
        <ArrowCircleRightRoundedIcon />
      </ButtonIconRight>
      {allposts &&
        allposts.map((item, index) => {
          return (
            <Slide key={index} className={index === current ? "active" : ""}>
              {index === current && (
                <Image src={item.featuredImage} alt={item.country} />
              )}
            </Slide>
          );
        })}
    </Slider>
  );
};

export default ToursSlider;
