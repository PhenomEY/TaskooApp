import axios from "axios";

/**
 * NotificationService
 */
export default {

  load(dashboard, context) {
    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/user/notifications', {params: {
              dashboard: dashboard
            }
          })
          .catch(error => {
            // context.$vToastify.error(error.response.data.detail);
            resolve(false);
          })
          .then(response => {
            if(!response) return;
            resolve(response.data);
          })
      }
    );
  },

  update(data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/user/notifications', data)
          .catch(error => {
            context.$vToastify.error(error.response.data.detail);
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
