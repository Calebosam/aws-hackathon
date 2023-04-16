import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onRegister, onLogin, fetchCurrentUser, onLogout } from "../../api/auth";
import { User } from "../../interfaces/User";
import { getDocumentsData } from "../../api/docs";
import { FileData } from "../../interfaces/Document";

interface UserState {
  loading: boolean;
  user: User | null;
  isAwaitingVerification: boolean;
  isLoggedIn: boolean;
  files: FileData[];
  errors: Error[];
}

const initialState: UserState = {
  loading: false,
  user: null,
  isAwaitingVerification: false,
  isLoggedIn: false,
  files: [],
  errors: [],
};

export const registerUser = createAsyncThunk<User | any, Object>("user/registerUser", async (data, thunkAPI) => {
  try {
    const response = await onRegister(data);
    thunkAPI.dispatch(awaitValidation(true));
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const loginUser = createAsyncThunk<Object, string | Object>("user/loginUser", async (data, thunkAPI) => {
  try {
    const response = await onLogin(data);
    thunkAPI.dispatch(authenticateUser(true));
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getUser = createAsyncThunk<void>("user/getCurrentUser", async (_, thunkAPI) => {
  try {
    const response = await fetchCurrentUser();
    if (response.data) {
      thunkAPI.dispatch(authenticateUser(true));
      thunkAPI.dispatch(setUserData(response.data));
      const filesData = await getDocumentsData();
      thunkAPI.dispatch(setFilesData(filesData.data.data));
    } else {
      thunkAPI.dispatch(authenticateUser(false));
      return;
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const logOutUser = createAsyncThunk<void>("user/logout", async (_, thunkAPI) => {
  try {
    await onLogout();
    thunkAPI.dispatch(authenticateUser(false));
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth && JSON.parse(isAuth) === true ? true : false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    awaitValidation: (state, action) => {
      state.isAwaitingVerification = action.payload;
    },
    setFilesData: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { authenticateUser, setUserData, awaitValidation, setFilesData } = authSlice.actions;
export default authSlice.reducer;
