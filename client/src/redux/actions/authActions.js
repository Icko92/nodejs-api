import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post("/api/superadmin/register", userData)
    .then((res) => console.log(res))
    .catch((err) =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      })
    );
};

//Login user - Get user token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/superadmin/login", userData)
    .then((res) => {
      //Save to local storage
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      })
    );
};

//Set login user
export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};
