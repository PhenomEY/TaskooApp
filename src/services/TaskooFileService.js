import axios from "axios";

/**
 * FileService
 */
export default {

  delete(fileId, context, successMessage = false, errorMessage = true) {

    return new Promise(resolve => {
        axios
          .delete(axios.defaults.baseURL+'/file/'+fileId)
          .catch(error => {
            if(errorMessage) {
              context.$vToastify.error(error.response.data.detail);
            }

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

}
