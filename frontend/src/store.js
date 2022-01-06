import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegistrationReducer,
} from "./reducers/userReducers";
import { postCreateReducer, postListReducer } from "./reducers/postsReducers";

const reducer = combineReducers({
  //this will contain our reducers
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
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
