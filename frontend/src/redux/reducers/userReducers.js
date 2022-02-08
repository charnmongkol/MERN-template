import {
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_ALL_FAIL,
  USER_SINGLE_REQUEST,
  USER_SINGLE_SUCCESS,
  USER_SINGLE_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//add this reducers to store (state)
export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { loading: true };
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTRATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { allUsers: [] }, action) => {
  switch (action.type) {
    case USER_ALL_REQUEST:
      return { loading: true };
    case USER_ALL_SUCCESS:
      return { loading: false, allUsers: action.payload };
    case USER_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewUserRededucer = (state = {}, action) => {
  switch (action.type) {
    case USER_SINGLE_REQUEST:
      return { loading: true };
    case USER_SINGLE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
