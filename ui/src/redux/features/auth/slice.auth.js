import {createSlice} from "@reduxjs/toolkit";
import {register} from "./actions.auth";

// Initial state of auth
const initialState = {
    user: null,
    isAuthenticated: false,
    status: "idle",
    success: false,
    message: null,
}

// load the persisted state
const persistedState = JSON.parse(localStorage.getItem("persist: root" || ""));

const updatedInitialState = {
    ...initialState,
    ...persistedState?.auth,
};

const authSlice = createSlice({
    name: "auth",
    initialState: updatedInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.success = false;
                state.status = "loading";
                state.message = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log("registration successful:", action);
                state.status = "successful";
                state.isAuthenticated = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
            }).addCase(register.rejected, (state, action) => {
                console.log("registration failed:", action);
                state.status = "failed";
                state.isAuthenticated = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
            })
    }
})

export default authSlice.reducer;