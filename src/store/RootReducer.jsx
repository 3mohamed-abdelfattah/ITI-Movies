import { combineReducers } from "redux";
import Reducer from "./Reducer";

const RootReducer = combineReducers({
    counter: Reducer,
});

export default RootReducer;
