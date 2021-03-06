import axios from "axios";

/**
 * FileService
 */
export default {

  delete(fileId, context, successMessage = true, errorMessage = true) {
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

  upload(file, taskId = null, context, successMessage = false, errorMessage = true) {
    let formData = new FormData();
    formData.append('file', file);

    if(taskId) {
      formData.append('taskId', taskId);
    }


    return new Promise(resolve => {
      axios
        .post(axios.defaults.baseURL+'/file', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
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
    });
  }

}
