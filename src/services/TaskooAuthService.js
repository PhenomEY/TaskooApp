import axios from "axios";

/**
 * AuthService
 */
export default {

  login(data, context, successMessage = false) {

    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/auth/login', data)
          .catch(error => {
            context.$vToastify.error(error.response.data.message);
            resolve(false);
          })
          .then(response => {
            if(!response) return;

            if(successMessage === true) {
              context.$vToastify.success(response.data.message);
            }

            resolve(response.data);
          })
      }
    );
  },

  check(context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/auth/check')
          .catch(error => {
            resolve(false);
          })
          .then(response => {
            if(!response) return;

            if(successMessage === true) {
              context.$vToastify.success(response.data.message);
            }

            resolve(response.data);
          })
      }
    );
  },
  logout(data) {
  },
}