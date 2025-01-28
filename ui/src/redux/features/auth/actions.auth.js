import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "./../../api/api";

// register user
export const register = createAsyncThunk(
    "auth/register",
    async(data, {rejectWithValue}) => {
        // console.log("Register action:", {data});
        try {
            const {
                firstname,
                lastname,
                age,
                gender,
                words,
                digits,
                petname
            } = data;

            console.log("form contents:", firstname,
                lastname,
                age,
                gender,
                words,
                digits,
                petname
            );

            const response = await API.post("/auth/register", {
                firstname,
                lastname,
                age,
                gender,
                words,
                digits,
                petname
            });

            console.log("Register action response:", response.data);
            return response.data
        } catch (error) {
            // console.log("Register action ERROR:", error);
            console.log("Register action response:", error.response.data.message);
            return rejectWithValue(error.response.data)
        }
    }
)