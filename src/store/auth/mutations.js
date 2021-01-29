/*
export function someMutation (state) {
}
*/

import axios from "axios";

export function toggleLoggingIn(state, value) {
  if(value == false) {
    setTimeout(() => (
      state.loggingIn = value
    ), 1000);
  } else {
    state.loggingIn = value
  }
}

export function setAuthToken(state, value) {
  localStorage.setItem('authToken', value);
  state.authToken = value
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken');
}

export function setVerifiedUser(state, value) {
  state.verifiedUser = value
}
