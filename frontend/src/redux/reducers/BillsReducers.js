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

export const allBillsReducer = (state = { allbills: [] }, action) => {
  switch (action.type) {
    case BILLS_ALL_REQUEST:
      return { loading: true };
    case BILLS_ALL_SUCCESS:
      return { loading: false, allbills: action.payload };
    case BILLS_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myBillsReducer = (state = { mybills: [] }, action) => {
  switch (action.type) {
    case MY_BILLS_REQUEST:
      return { loading: true };
    case MY_BILLS_SUCCESS:
      return { loading: false, mybills: action.payload };
    case MY_BILLS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLS_CREATE_REQUEST:
      return { loading: true };
    case BILLS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BILLS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBillByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case BILL_ID_REQUEST:
      return { loading: true };
    case BILL_ID_SUCCESS:
      return { loading: false, bill: action.payload };
    case BILL_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBillStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case BILL_STATUS_REQUEST:
      return { loading: true };
    case BILL_STATUS_SUCCESS:
      return { loading: false, success: true };
    case BILL_STATUS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
