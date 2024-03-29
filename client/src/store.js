import { configureStore } from '@reduxjs/toolkit'
import useReducer from './Slice/userSlice'

export default configureStore({
    reducer: {
        user: useReducer
    }
})