import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    currentUser: [],
    error: false,
    loading: false,
    isAuthenticated: false
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

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (data, { rejectWithValue }) => {
        console.log("goggle  auth slice is called ", data)
        try {
            console.log("signIn auth slice is called inside ")
            const response = await axios.post("/api/v1/auth/signIn", data)
            console.log(response)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Network Error. Please try again later."
            );
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        console.log("goggle  auth slice is called ",)
        try {
            console.log("logout auth slice is called inside ")
            await axios.post("/api/v1/auth/logout")

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Network Error. Please try again later."
            );
        }
    }
)
export const google = createAsyncThunk(
    'auth/google',
    async (data, { rejectWithValue }) => {
        console.log("google auth slice is called ")
        try {
            console.log("google auth slice is called inside ")
            const response = await axios.post("/api/v1/auth/google", data)
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
            state.currentUser = action.payload
            state.isAuthenticated = true
        })
        builder.addCase(signUp.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.currentUser = action.payload
            state.isAuthenticated = true

        })
        builder.addCase(signIn.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(google.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.currentUser = action.payload
            state.isAuthenticated = true

        })
        builder.addCase(google.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(google.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.error = false
            state.currentUser = null
            state.isAuthenticated = false

        })
        builder.addCase(logout.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }

})

export default AuthSlice.reducer