import axios from "axios";

/**
 * TeamRoleServoce
 */
export default {

  /**
   * @description loading all teamroles
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  load(context, successMessage = false) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/teamroles')
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

  /**
   * @description updating teamrole by id
   * @param roleId
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  update(roleId, data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/teamroles/'+roleId, data)
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

  /**
   * @description create new teamrole
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  create(data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/teamroles', data)
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

  delete(roleId, context, successMessage = true) {
    return new Promise(resolve => {
        axios
          .delete(axios.defaults.baseURL+'/teamroles/'+roleId)
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
