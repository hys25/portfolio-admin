import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//Get user from localStorage
console.log(localStorage.getItem('user'))
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Register user
// export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {

// })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false,
      state.isSuccess = false,
      state.isLoading = false,
      state.message = ''
    }
  },
  extraReducers: () => {}
})

export const { reset } = authSlice.actions
export default authSlice.reducer