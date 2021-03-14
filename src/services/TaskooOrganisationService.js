import axios from "axios";

/**
 * OrganisationService
 */
export default {
users: {
  load(organisationId, context, successMessage = false) {

    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/organisation/'+organisationId+'/users')
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
}
}
