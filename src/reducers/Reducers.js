import { combineReducers } from "redux";
import authReducers from "./AuthReducers";
import siteDataReducers from "./SiteDataReducers";
import menuReducers from "./MenuReducers";
import toggleViewReducer from "./toggleViewReducer";

const appReducers = combineReducers({
  authReducers,
  siteDataReducers,
  menuReducers,
  toggleViewReducer,
});

export default appReducers;
