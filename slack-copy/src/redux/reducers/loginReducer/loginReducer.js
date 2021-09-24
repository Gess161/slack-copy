import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: 'none',
    password: 'user password',
    showError: ''
}
const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.showError = action.payload.showError
        },
    },
});

export const { loginReducer } = slice.actions
export default slice.reducer