import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthSliceState {
  value: number
}

const initialState: AuthSliceState = {
  value: "",
  password:""
}

export const AuthSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail ,setPassword } = AuthSlice.actions

export default AuthSlice.reducer