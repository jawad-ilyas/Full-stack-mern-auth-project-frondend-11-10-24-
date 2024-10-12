import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    data: [],
    error: false,
    loading: false
}

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/signUp", data)
            console.log(response)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Network Error. Please try again later."
            );
        }
    }
)

const AuthSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload
        })
        builder.addCase(signUp.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }

})

export default AuthSlice.reducer