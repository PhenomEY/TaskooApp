import axios from "axios";

/**
 * TeamService
 */
export default {
users: {
  load(organisationId, context, successMessage = false) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/team/'+organisationId+'/users')
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
},

  projects: {
    load(organisationId, context, successMessage = false) {

      return new Promise(resolve => {
          axios
            .get(axios.defaults.baseURL+'/team/'+organisationId+'/projects')
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
}
