import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts } from "../../actions/postsActions";
import moment from "moment";
import "./Posts.css";
import Loading from "../../components/Loading";

const Posts = () => {
  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state?.allPosts);
  const { loading, allposts } = allPosts;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <section className="dark">
        <div className="container py-4">
          <h1 className="h1 text-center" id="pageHeaderTitle">
            Valuable Programs
          </h1>
          {allposts &&
            allposts.map((post) => (
              <article className="postcard dark blue" key={post._id}>
                <div className="postcard__img_link">
                  <img
                    className="postcard__img"
                    src={post.featuredImage}
                    alt={post.title}
                  />
                </div>
                <div className="postcard__text">
                  <h1 className="postcard__title blue">{post.title}</h1>
                  <div className="postcard__subtitle small">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {moment(post.createdAt).format("LL")}
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">{post.content}</div>
                  <ul className="postcard__tagbox">
                    <li className="tag__item">
                      <i className="fas fa-tag mr-2"></i>
                      {post.category}
                    </li>
                    <li className="tag__item">
                      <i className="fas fa-clock mr-2"></i>
                      {post.seats}
                    </li>
                    <li className="tag__item play blue">
                      <div>
                        <i className="fas fa-play mr-2"></i>
                        {post.code}
                      </div>
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          {/* <article className="postcard dark red">
            <a className="postcard__img_link" href="#">
              <img
                className="postcard__img"
                src="https://picsum.photos/501/500"
                alt="Image Title"
              />
            </a>
            <div className="postcard__text">
              <h1 className="postcard__title red">
                <a href="#">Podcast Title</a>
              </h1>
              <div className="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, fugiat asperiores inventore beatae accusamus odit
                minima enim, commodi quia, doloribus eius! Ducimus nemo
                accusantium maiores velit corrupti tempora reiciendis molestiae
                repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!
              </div>
              <ul className="postcard__tagbox">
                <li className="tag__item">
                  <i className="fas fa-tag mr-2"></i>Podcast
                </li>
                <li className="tag__item">
                  <i className="fas fa-clock mr-2"></i>55 mins.
                </li>
                <li className="tag__item play red">
                  <a href="#">
                    <i className="fas fa-play mr-2"></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article> */}
        </div>
      </section>
    </>
  );
};

export default Posts;
