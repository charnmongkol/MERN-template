import {
  USER_ALL_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_SINGLE_FAIL,
  USER_SINGLE_REQUEST,
  USER_SINGLE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    //1. try to login
    dispatch({ type: USER_LOGIN_REQUEST });

    //whenever we are making an api request that takes a json data, we need to provide headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );

    // console.log(data);
    //if login success, send data
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if login fail
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

//registration
export const register =
  (
    name,
    email,
    password,
    licenseNumber,
    licenseStart,
    licenseEnd,
    address,
    phoneNumber,
    website,
    pic,
    licensePic,
    zone
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTRATION_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        {
          name,
          email,
          password,
          licenseNumber,
          licenseStart,
          licenseEnd,
          address,
          phoneNumber,
          website,
          pic,
          licensePic,
          zone,
        },
        config
      );

      dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    //taking out user login from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//go to create a page for user profile

export const allUsersForAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ALL_REQUEST,
    });

    //taking out user login from state
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get("/api/users/allUsers");

    dispatch({
      type: USER_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_ALL_FAIL,
      payload: message,
    });
  }
};

export const singleUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SINGLE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_SINGLE_FAIL,
      payload: message,
    });
  }
};