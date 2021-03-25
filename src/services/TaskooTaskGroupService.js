import axios from "axios";

/**
 * TaskGroupService
 */
export default {

  load(groupId, doneTasks = false, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/taskgroup/'+groupId, {params: {
              done: doneTasks
            }
          })
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

  update(groupId, data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/taskgroup/'+groupId, data)
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
    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/taskgroup', data)
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

  delete(groupId, context, successMessage = true) {
    return new Promise(resolve => {
      axios
        .delete(axios.defaults.baseURL+'/taskgroup/'+groupId)
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
