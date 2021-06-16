import axios from "axios";

/**
 * ProjectService
 */
export default {
  /**
   * @description load project by id
   * @param projectId
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  load(projectId, context, successMessage = false, errorMessage = true) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/project/'+projectId)
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


  /**
   * @description update project by id
   * @param projectId
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  update(projectId, data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .put(axios.defaults.baseURL+'/project/'+projectId, data)
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
   * @description create new project
   * @param data
   * @param context
   * @param successMessage
   * @returns {Promise<unknown>}
   */
  create(data, context, successMessage = false) {
    return new Promise(resolve => {
        axios
          .post(axios.defaults.baseURL+'/project', data)
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

  delete(projectId, context, successMessage = true) {
      return new Promise(resolve => {
          axios
            .delete(axios.defaults.baseURL+'/project/'+projectId)
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

  favorite: {
    add(projectId, context, successMessage = false, errorMessage = false) {
      return new Promise(resolve => {
          axios
            .post(axios.defaults.baseURL+'/project/favorite/'+projectId)
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

    update(positions, context, successMessage = false, errorMessage = false) {
      return new Promise(resolve => {
          axios
            .put(axios.defaults.baseURL+'/favorites', {positions})
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

    remove(projectId, context, successMessage = false, errorMessage = false) {
      return new Promise(resolve => {
          axios
            .delete(axios.defaults.baseURL+'/project/favorite/'+projectId)
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
}
