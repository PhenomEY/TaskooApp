export default function () {
  return {
    loggingIn: false,
    verifiedUser: false,
    authToken: localStorage.getItem('authToken'),
    userRoles: {
      1: "IS_DEFAULT",
      10: "IS_ADMIN"
    }
  }
}
