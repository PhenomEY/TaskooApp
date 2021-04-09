import axios from "axios";

/**
 * UserService
 */
export default {

  /**
   * @description Loading User by id
   * @param userId
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  load(userId, context, successMessage = false) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/user/'+userId)
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


  update(userId, data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/user/'+userId, data)
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

  create(data, context, successMessage = false) {
  },

  delete(taskId, context, successMessage = true) {
  }
}
