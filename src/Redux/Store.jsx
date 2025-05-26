import { createStore} from "redux";
import langReducer from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(langReducer, composeWithDevTools());
export default store;