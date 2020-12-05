import React from "react";
import { deviceStorage } from "../utils/deviceStorage";
import { apiUtils } from "../utils/apiUtils";
import { getUserAndRoles } from "../utils/JwtTokenParser";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const initialState = {
  role: "",
  jwtToken: "",
  userName: "",
  isLoggedIn: false,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    // Sign in
    case "SIGN_IN": {
      return { ...state, status: status.PENDING };
    }
    case "SIGN_IN_SUCCESS": {
      //deviceStorage.save("jwtToken", payload.jwtToken).then((token) => token);
      console.log(state);
      return {
        ...state,
        status: status.RESOLVED,
        userName: payload.userName,
        jwtToken: payload.jwtToken,
        role: payload.role,
        isLoggedIn: true,
      };
    }
    case "SIGN_IN_FAILED":
      return { status: status.REJECTED, error: payload.error };

    // // Sign up
    // case "SIGN_UP":
    //   return { ...state, status: status.PENDING };
    // case "SIGN_UP_SUCCESS":
    //   return { ...state, status: status.RESOLVED };
    // case "SIGN_UP_FAILED":
    //   return { ...state, status: status.REJECTED, error: payload.error };

    // Sign out
    case "SIGN_OUT": {
      // await deviceStorage.remove("jwtToken");
      return {
        initialState,
      };
    }
    default: {
      throw new Error(`Unhandled type: ${type}`);
    }
  }
};

const signIn = async (_username, password, dispatch) => {
  dispatch({ type: "SIGN_IN" });
  try {
    const options = await apiUtils.makeOptions("POST", {
      userName: _username,
      password: password,
    });
    const res = await apiUtils.fetchData("/api/users/signin", options);
    const { userName, role } = getUserAndRoles(res.token);
    dispatch({
      type: "SIGN_IN_SUCCESS",
      payload: {
        userName,
        jwtToken: res.token,
        role,
      },
    });
  } catch (error) {
    dispatch({ type: "SIGN_IN_FAILED", payload: error });
  }
};

const init = (initialState) => {
  //const token = deviceStorage.read("jwtToken").then((token) => token);
  const token = null;
  if (token) {
    const { userName, role } = getUserAndRoles(token);
    return {
      ...initialState,
      role: role,
      jwtToken: token,
      userName: userName,
      isLoggedIn: true,
    };
  } else {
    return initialState;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch, signIn };
