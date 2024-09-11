import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
  };
  
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action) => {
        const { _id, name, email } = action.payload;
  
        (state._id = _id),
          (state.name = name),
          (state.email = email)
      },
      resetUser: (state, action) => {
        state._id = "";
        state.name = "";
        state.email = "";
      },
    },
  });
  
  export const { setUser, resetUser } = userSlice.actions;
  export default userSlice.reducer;
  