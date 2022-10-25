import axios from "axios";
import store from "../app/store";
import { currentUserAction } from "../features/currentUserSlice";

export const registerUser = async (
  firstname,
  lastname,
  email,
  password,
  loading,
  error
) => {
  try {
    const fullname = `${firstname} ${lastname}`;
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/register",
      data: {
        fullname: fullname,
        email: email,
        password: password,
      },
      withCredentials: true,
    });

    store.dispatch(
      currentUserAction({
        token: response.data.accessToken,
        user: response.data.user,
      })
    );
    loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      error(errorMessage);
    } else {
      error(err.message);
    }

    loading(false);
  }
};

export const loginUser = async (email, password, loading, error) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/login",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
    });

    store.dispatch(
      currentUserAction({
        token: response.data.accessToken,
        user: response.data.user,
      })
    );
    loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      error(errorMessage);
    } else {
      error(err.message);
    }
    loading(false);
  }
};

export const currentAuthUser = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/refreshToken",
      withCredentials: true,
    });

    store.dispatch(
      currentUserAction({
        token: response.data.accessToken,
        user: response.data.user,
      })
    );
    // loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      // error(errorMessage);
      console.log(errorMessage);
    } else {
      // error(err.message);
      console.log(err.Message);
    }
    // loading(false);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/logout",
      withCredentials: true,
    });

    store.dispatch(currentUserAction({}));
    // loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      // error(errorMessage);
      console.log(errorMessage);
    } else {
      // error(err.message);
      console.log(err.Message);
    }
    // loading(false);
  }
};
