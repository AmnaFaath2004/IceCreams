
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: JSON.parse(localStorage.getItem("users")) || [],
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,

    },
    reducers: {
        userRegister: (state, action) => {
            state.users.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state.users))

        },
        userLogin: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        },
        userOut: (state, action) => {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem("user")
            localStorage.removeItem("isAuthenticated")
        },
        DeleteUser: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload)
            if (userIndex !== -1) {
                state.users.splice(userIndex, 1);
                localStorage.setItem("users", JSON.stringify(state.users))
            }

        },
        UsersEdits: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id)
            if (userIndex !== -1) {
                state.users[userIndex] = action.payload
                localStorage.setItem("users", JSON.stringify(state.users))
            }

        },
        userStatusChange: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload)
            if (userIndex !== -1) {
                state.users[userIndex].status = !state.users[userIndex].status
                localStorage.setItem("users", JSON.stringify(state.users))
            }
            if (state.user && state.user.id === action.payload) {
                state.user.status = !state.user.status
                localStorage.setItem("user", JSON.stringify(state.user))
            }

        },
        userRoleChange:(state, action)=>{
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id)
             if (userIndex !== -1) {
                state.users[userIndex].role=action.payload.role
                localStorage.setItem("users",JSON.stringify(state.users))
             }
             if(state.user && state.user.id === action.payload.id){

                state.user.role =action.payload.role
                localStorage.setItem("user",JSON.stringify(state.user))
             }
        }

    }
})
export default userSlice.reducer;
export const { userRegister, userLogin, userOut, DeleteUser, UsersEdits ,userStatusChange,userRoleChange} = userSlice.actions;