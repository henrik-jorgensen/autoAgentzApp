import { combineReducers } from "redux";

import auth from "./auth_reducer";
import likes from "./likes_reducer";
import likesSummary from "./likes_summary_reducer";
import dislikes from "./dislikes_reducer";
import likeStatus from "./like_status_reducer";
import vehicleStatus from "./vehicle_status_reducer";
import vehicles from "./vehicles_reducer";
import swipe from "./swipe_reducer";
import newUser from "./new_user_reducer";
import onboardingStatus from "./onboarding_reducer";
import demo from "./demo_reducer";
import customer from "./customer_reducer";
import online from "./online_reducer";
import locale from "./locale_reducer";

const reducers = combineReducers({
  auth,
  likes,
  likesSummary,
  dislikes,
  likeStatus,
  vehicleStatus,
  vehicles,
  swipe,
  newUser,
  onboardingStatus,
  demo,
  customer,
  online,
  locale
});

export default reducers;
