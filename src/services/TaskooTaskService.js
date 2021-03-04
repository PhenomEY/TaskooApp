import axios from "axios";

/**
 * TaskService
 */
export default {

  /**
   * @description Loading Task by id
   * @param taskId
   * @param context
   * @param subTasks
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  load(taskId, context, subTasks = false, successMessage = false) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/task/'+taskId, {params: {
              subTasks: subTasks
            }
          })
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

  /**
   * @description updating task by id
   * @param taskId
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  update(taskId, data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/task/'+taskId, data)
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

  /**
   * @description create new task
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  create(data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/task', data)
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

  delete(taskId, context, successMessage = true) {
    return new Promise(resolve => {
        axios
          .delete(axios.defaults.baseURL+'/task/'+taskId)
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
  }
}
