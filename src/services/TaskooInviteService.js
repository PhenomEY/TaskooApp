import axios from "axios";

/**
 * InviteService
 */
export default {
  load(inviteId) {
    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/invite/'+inviteId)
          .catch(error => {
            resolve(false);
          })
          .then(response => {
            if(!response) return;
            resolve(response.data);
          })
      }
    );
  },

  finish(inviteId, data, context) {
    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/invite/'+inviteId, data)
          .catch(error => {
            context.$vToastify.error(error.response.data.detail);
            resolve(false);
          })
          .then(response => {
            if(!response) return;
            resolve(response.data);
          })
      }
    );
  }
}
