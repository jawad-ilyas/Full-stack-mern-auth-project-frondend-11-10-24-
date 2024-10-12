import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/Auth.Slice";


const Store = configureStore({

    reducer: {
        auth: AuthSlice
    }
})

export { Store }