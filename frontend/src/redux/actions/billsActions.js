import axios from "axios";
import {
  BILLS_ALL_FAIL,
  BILLS_ALL_REQUEST,
  BILLS_ALL_SUCCESS,
  BILLS_CREATE_FAIL,
  BILLS_CREATE_REQUEST,
  BILLS_CREATE_SUCCESS,
  BILL_ID_FAIL,
  BILL_ID_REQUEST,
  BILL_ID_SUCCESS,
  BILL_STATUS_FAIL,
  BILL_STATUS_REQUEST,
  BILL_STATUS_SUCCESS,
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
    const { data } = await axios.get(`/api/bills/allBills`, config);

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
    tourName,
    tourCode,
    startAt,
    remark
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
          tourName,
          tourCode,
          startAt,
          remark,
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

export const getBillById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BILL_ID_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bills/${id}`, config);

    dispatch({
      type: BILL_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: BILL_ID_FAIL,
      payload: message,
    });
  }
};

export const billUpdateStatus =
  (id, status, remark) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BILL_STATUS_REQUEST,
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
        `/api/bills/updateStatusBill/${id}`,
        { status, remark },
        config
      );

      dispatch({
        type: BILL_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BILL_STATUS_FAIL,
        payload: message,
      });
    }
  };
