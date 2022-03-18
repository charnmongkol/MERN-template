import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  reviewUserRededucer,
  userLoginReducer,
  userRegistrationReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  allPostsReducer,
  postCreateReducer,
  postDeleteReducer,
  postListReducer,
  postUpdateReducer,
} from "./reducers/postsReducers";
import {
  allBillsReducer,
  billCreateReducer,
  myBillsReducer,
} from "./reducers/BillsReducers";

const reducer = combineReducers({
  //this will contain our reducers
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userUpdate: userUpdateReducer,
  allUsers: allUsersReducer,
  singleUser: reviewUserRededucer,
  allPosts: allPostsReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  allBills: allBillsReducer,
  myBills: myBillsReducer,
  billCreate: billCreateReducer,
});

//whenever user comes back(or refreshing), it should fetch all stuffs from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
