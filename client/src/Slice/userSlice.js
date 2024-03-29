import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({

    name: "user",
    initialState: {
        token: localStorage.getItem("token"),
        user: null,
        stripePK: localStorage.getItem("stripePK")
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setStripePK: (state, action) => {
            state.stripePK = action.payload
        }
    }

})

export const { setUser, setStripePK, setToken } = userSlice.actions

export const selectUser = (state) => state.user.user
export const selectStripePK = (state) => state.user.stripePK
export const selectToken = (state) => state.user.token

export default userSlice.reducer