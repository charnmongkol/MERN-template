import {
  POSTS_CREATE_FAIL,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_FAIL,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_FAIL,
  POSTS_ALL_REQUEST,
  POSTS_ALL_SUCCESS,
  POSTS_ALL_FAIL,
  POSTS_BYCODE_REQUEST,
  POSTS_BYCODE_SUCCESS,
  POSTS_BYCODE_FAILED,
  POSTS_UPDATESEAT_REQUEST,
  POSTS_UPDATESEAT_SUCCESS,
  POSTS_UPDATESEAT_FAILED,
  POSTS_UPDATESALE_REQUEST,
  POSTS_UPDATESALE_SUCCESS,
  POSTS_UPDATESALE_FAILED,
  POSTS_UPDATEHIGHLIGHT_REQUEST,
  POSTS_UPDATEHIGHLIGHT_SUCCESS,
  POSTS_UPDATEHIGHLIGHT_FAILED,
} from "../constants/postsConstants";

export const allPostsReducer = (state = { allposts: [] }, action) => {
  switch (action.type) {
    case POSTS_ALL_REQUEST:
      return { loading: true };
    case POSTS_ALL_SUCCESS:
      return { loading: false, allposts: action.payload };
    case POSTS_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POSTS_LIST_REQUEST:
      return { loading: true };
    case POSTS_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POSTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//add this reducer into store.js (state)

export const postsByCodeReducer = (state = { tours: [] }, action) => {
  switch (action.type) {
    case POSTS_BYCODE_REQUEST:
      return { loading: true };
    case POSTS_BYCODE_SUCCESS:
      return { loading: false, tours: action.payload };
    case POSTS_BYCODE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_CREATE_REQUEST:
      return { loading: true };
    case POSTS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_UPDATE_REQUEST:
      return { loading: true };
    case POSTS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const updateSeatReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_UPDATESEAT_REQUEST:
      return { loading: true };
    case POSTS_UPDATESEAT_SUCCESS:
      return { loading: false, success: true };
    case POSTS_UPDATESEAT_FAILED:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const updateSaleReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_UPDATESALE_REQUEST:
      return { loading: true };
    case POSTS_UPDATESALE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_UPDATESALE_FAILED:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const updateHighlighReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_UPDATEHIGHLIGHT_REQUEST:
      return { loading: true };
    case POSTS_UPDATEHIGHLIGHT_SUCCESS:
      return { loading: false, success: true };
    case POSTS_UPDATEHIGHLIGHT_FAILED:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_DELETE_REQUEST:
      return { loading: true };
    case POSTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POSTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
