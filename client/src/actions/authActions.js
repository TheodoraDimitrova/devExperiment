import axios from "axios";
import { GET_ERRORS } from "./types";

//register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        playload: err.response.data
      })
    );
};
