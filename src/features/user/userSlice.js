import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  allUser: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { setUser, setAllUser } = userSlice.actions;
export default userSlice.reducer;
