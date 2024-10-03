import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  role: "",
  address: "",
  number: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, email, name, auth, address, number, role } = action.payload;

      (state._id = _id),
        (state.email = email),
        (state.name = name),
        (state.role = role),
        (state.address = address),
        (state.number = number),
        (state.auth = auth);
    },
    resetUser: (state, action) => {
      state._id = "";
      state.email = "";
      state.name = "";
      state.role = "";
      state.address = "";
      state.number = "";
      state.auth = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
