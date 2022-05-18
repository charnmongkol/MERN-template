import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  reviewUserRededucer,
  updateStatusUserReducer,
  userLoginReducer,
  userRegistrationReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  allPostsReducer,
  highlightPostsReducer,
  postCreateReducer,
  postDeleteReducer,
  postListReducer,
  postsByCodeReducer,
  postUpdateReducer,
  updateHighlighReducer,
  updateSaleReducer,
  updateSeatReducer,
} from "./reducers/postsReducers";
import {
  allBillsReducer,
  billCreateReducer,
  getBillByIdReducer,
  myBillsReducer,
  updateBillStatusReducer,
} from "./reducers/BillsReducers";

const reducer = combineReducers({
  //this will contain our reducers
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userUpdate: userUpdateReducer,
  userStatus: updateStatusUserReducer,
  allUsers: allUsersReducer,
  singleUser: reviewUserRededucer,
  allPosts: allPostsReducer,
  highlightPosts: highlightPostsReducer,
  postList: postListReducer,
  tours: postsByCodeReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  seatUpdate: updateSeatReducer,
  saleUpdate: updateSaleReducer,
  highlightUpdate: updateHighlighReducer,
  postDelete: postDeleteReducer,
  allBills: allBillsReducer,
  myBills: myBillsReducer,
  bill: getBillByIdReducer,
  billCreate: billCreateReducer,
  updateBillStatus: updateBillStatusReducer,
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
