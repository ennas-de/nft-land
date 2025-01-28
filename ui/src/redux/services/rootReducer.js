import {combineReducers} from "redux";

// import platform states' services (reducers)
import authReducer from "./../features/auth/slice.auth";
import _themeReducer from "@/redux/features/_theme/slice.theme";


const rootReducer = combineReducers({
    theme: _themeReducer,
    auth: authReducer,
})

export default rootReducer;