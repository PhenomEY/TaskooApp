import axios from "axios";

/**
 * TaskGroupService
 */
export default {
  search(searchTerm, context, limit = 20, offset = 0, type= 'all') {
    return new Promise(resolve => {
        axios
          .get(axios.defaults.baseURL+'/search/'+searchTerm, {params: {
              l: limit,
              o: offset,
              t: type
            }
          })
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
