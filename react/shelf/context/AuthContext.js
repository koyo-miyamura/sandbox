import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const INIT = "INIT";
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return { token: action.payload };
    case SIGNIN:
      return { token: action.payload };
    case SIGNOUT:
      return { token: null };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      // replace get token from api
      const token = "ok";
      await AsyncStorage.setItem("token", token);
      dispatch({ type: SIGNIN, payload: token });
    } catch (error) {
      console.log(error);
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      // replace get token from api
      const token = "ok";
      await AsyncStorage.setItem("token", token);
      dispatch({ type: SIGNIN, payload: token });
    } catch (error) {
      console.log(error);
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: SIGNOUT });
};

const initAuthState = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: INIT, payload: token });
  } else {
    dispatch({ type: SIGNOUT });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    initAuthState,
  },
  { token: null }
);
