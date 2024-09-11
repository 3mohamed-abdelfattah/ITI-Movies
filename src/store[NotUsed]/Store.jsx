import { createStore } from "redux";
import rootReducer from "./RootReducer";

const Store = createStore(rootReducer);

export default Store;
