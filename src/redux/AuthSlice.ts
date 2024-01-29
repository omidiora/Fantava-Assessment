import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthSliceState {
  value: number
}

const initialState: AuthSliceState = {
  value: "",
  password:"",
  details:{}
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password= action.payload
    },
    setDetails: (state, action: PayloadAction<string>) => {
      state.details= action.payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail ,setPassword ,setDetails} = AuthSlice.actions

export default AuthSlice.reducer