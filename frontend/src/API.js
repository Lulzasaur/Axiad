//main file to make all AJAX calls to the server.

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

class API {
  static async request(endpoint, params = {}, verb = 'get') {
    
    let q;

    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { ...params }
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
    } 

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //get all urls with their associated largest images
  static async getScrapes() {
    let res = await this.request(`scrapes`);
    return res;
  }

  //add url 
  static async addScrape(data) {
    let res = await this.request('scrapes',data,'post');
    return res;
  }

}

export default API;
