import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: "loggedIn" | "loggedOut" | "Registered";
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (!existingUser) {
        state.users.push(action.payload);
        state.status = "Registered";
        console.log("User registered successfully!");
      } else {
        console.error("User with this email already exists!");
      }
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      } else {
        console.error("Invalid email or password!");
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.loggedInUser;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;

export default userSlice.reducer;