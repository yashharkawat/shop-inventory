import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

const initialState = {
  id:"",
  name: "",
  email: "",
  phone:"",
  shops:[],
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    changeCurrentUser(state, action) {
      if (action.payload === "reset") {
        state = {...initialState};
        
      } else {
        state.shops=(action.payload.shops|| []);
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
        state.id=action.payload.id;
      }
    },
    changeCurrentUserEmail(state, action) {
      state.email = action.payload;
    },
    changeCurrentUserName(state, action) {
      state.name = action.payload;
    },
    changeCurrentUserPhone(state, action) {
      state.phone = action.payload;
    },
  },
});
const persistConfig = {
  key: "root", // key for the persisted data in storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
});

export const actions = userSlice.actions;
