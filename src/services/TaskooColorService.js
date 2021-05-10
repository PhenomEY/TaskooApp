import axios from "axios";

/**
 * ColorService
 */
export default {

  load(context, successMessage = false, errorMessage = true) {
    return new Promise(resolve => {
      axios
        .get(axios.defaults.baseURL+'/colors')
        .catch(function (error) {
          if(errorMessage) {
            context.$vToastify.error(error.response.data.detail);
          }
        })
        .then(response => {
          resolve(response.data)
        })
      }
    );
  },
}
