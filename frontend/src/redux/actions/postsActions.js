import axios from "axios";
import {
  POSTS_ALL_FAIL,
  POSTS_ALL_REQUEST,
  POSTS_ALL_SUCCESS,
  POSTS_BYCODE_FAILED,
  POSTS_BYCODE_REQUEST,
  POSTS_BYCODE_SUCCESS,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_DELETE_FAIL,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POSTS_UPDATEHIGHLIGHT_FAILED,
  POSTS_UPDATEHIGHLIGHT_REQUEST,
  POSTS_UPDATEHIGHLIGHT_SUCCESS,
  POSTS_UPDATESALE_FAILED,
  POSTS_UPDATESALE_REQUEST,
  POSTS_UPDATESALE_SUCCESS,
  POSTS_UPDATESEAT_REQUEST,
  POSTS_UPDATESEAT_SUCCESS,
  POSTS_UPDATE_FAIL,
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
} from "../constants/postsConstants";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POSTS_ALL_REQUEST,
    });
    const { data } = await axios.get("/api/posts/allPosts");

    dispatch({
      type: POSTS_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_ALL_FAIL,
      payload: message,
    });
  }
};

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts`, config);

    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const getPostsByCode = (tourCode) => async (dispatch) => {
  try {
    dispatch({
      type: POSTS_BYCODE_REQUEST,
    });
    const { data } = await axios.get(`/api/posts/tours/${tourCode}`);

    dispatch({
      type: POSTS_BYCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_BYCODE_FAILED,
      payload: message,
    });
  }
};

export const createPostAction =
  (
    tourName,
    tourCode,
    highlight,
    country,
    startAt,
    endAt,
    commission,
    comSales,
    seatsCl,
    seatsGu,
    seatsAval,
    pdfFile,
    wordFile,
    featuredImage,
    priceA,
    priceB,
    priceC,
    priceD,
    priceE,
    priceF
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });

      //get useInfo in state
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          //sending in json format
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //api calls
      const { data } = await axios.post(
        `/api/posts/create`,
        {
          tourName,
          tourCode,
          highlight,
          country,
          startAt,
          endAt,
          commission,
          comSales,
          seatsCl,
          seatsGu,
          seatsAval,
          pdfFile,
          wordFile,
          featuredImage,
          priceA,
          priceB,
          priceC,
          priceD,
          priceE,
          priceF,
        },
        config
      );

      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_LIST_FAIL,
        payload: message,
      });
    }
  };

export const updatePostAction =
  (
    id,
    tourName,
    tourCode,
    highlight,
    country,
    startAt,
    endAt,
    commission,
    comSales,
    seatsCl,
    seatsGu,
    seatsAval,
    pdfFile,
    wordFile,
    featuredImage,
    priceA,
    priceB,
    priceC,
    priceD,
    priceE,
    priceF
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/${id}`,
        {
          tourName,
          tourCode,
          highlight,
          country,
          startAt,
          endAt,
          commission,
          comSales,
          seatsCl,
          seatsGu,
          seatsAval,
          pdfFile,
          wordFile,
          featuredImage,
          priceA,
          priceB,
          priceC,
          priceD,
          priceE,
          priceF,
        },
        config
      );

      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const seatUpdateAction =
  (id, seatsAval) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATESEAT_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/posts/updateSeats/${id}`,
        { seatsAval },
        config
      );

      dispatch({
        type: POSTS_UPDATESEAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const isSaleUpdateAction =
  (id, isSale) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATESALE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/updateIsSale/${id}`,
        { isSale },
        config
      );

      dispatch({
        type: POSTS_UPDATESALE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_UPDATESALE_FAILED,
        payload: message,
      });
    }
  };

export const isHighLightUpdateAction =
  (id, isHighlight) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATEHIGHLIGHT_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/updateIsHighlight/${id}`,
        { isHighlight },
        config
      );

      dispatch({
        type: POSTS_UPDATEHIGHLIGHT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_UPDATEHIGHLIGHT_FAILED,
        payload: message,
      });
    }
  };

export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_DELETE_REQUEST,
    });

    //tale userInfo from the state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POSTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_DELETE_FAIL,
      payload: message,
    });
  }
};
//go to myPost to create a logic
