import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'home',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
      }
    }
})

export const { setLoggedIn} = authSlice.actions
export default authSlice.reducer