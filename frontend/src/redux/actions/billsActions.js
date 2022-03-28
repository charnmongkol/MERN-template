import axios from "axios";
import {
  BILLS_ALL_FAIL,
  BILLS_ALL_REQUEST,
  BILLS_ALL_SUCCESS,
  BILLS_CREATE_FAIL,
  BILLS_CREATE_REQUEST,
  BILLS_CREATE_SUCCESS,
  MY_BILLS_FAIL,
  MY_BILLS_REQUEST,
  MY_BILLS_SUCCESS,
} from "../constants/billsConstants";

export const getAllBills = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BILLS_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("api/posts/allBills", config);

    dispatch({
      type: BILLS_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: BILLS_ALL_FAIL,
      payload: message,
    });
  }
};

export const getMyBills = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_BILLS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bills/myBills`, config);

    dispatch({
      type: MY_BILLS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: MY_BILLS_FAIL,
      payload: message,
    });
  }
};

export const createBillAction =
  (
    totalAmount,
    quantityA,
    quantityB,
    quantityC,
    quantityD,
    quantityE,
    quantityF,
    tour
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BILLS_CREATE_REQUEST,
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

      const { data } = await axios.post(
        `/api/bills/createBill`,
        {
          totalAmount,
          quantityA,
          quantityB,
          quantityC,
          quantityD,
          quantityE,
          quantityF,
          tour,
        },
        config
      );

      dispatch({
        type: BILLS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BILLS_CREATE_FAIL,
        payload: message,
      });
    }
  };
