import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/utils/authSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});