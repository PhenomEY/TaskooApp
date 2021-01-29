export default function () {
  return {
    loggingIn: false,
    verifiedUser: false,
    authToken: localStorage.getItem('authToken'),
  }
}
