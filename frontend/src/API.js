//main file to make all AJAX calls to the server.

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

class API {

  //Old ternary code used for switching between axios requests
  // static async request(endpoint, params = {}, verb = 'get') {
    
  //   let q;

  //   if (verb === 'get') {
  //     q = await axios.get(`${BASE_URL}/${endpoint}`, {
  //       params: { ...params }
  //     });
  //   } else if (verb === 'post') {
  //     q = await axios.post(`${BASE_URL}/${endpoint}`, { ...params });
  //   } 

  //   try {
  //     return q.data;
  //   } catch (err) {
  //     console.error('API Error:', err.response);
  //     let message = err.response.data.message;
  //     throw Array.isArray(message) ? message : [message];
  //   }
  // }

  static async getAllScrapes() {
    let res = await axios.get(`${BASE_URL}/scrapes`);
    return res
  }

  //to be used for later
  // static async getScrape(id) {
  //   let res = await this.request(`scrapes/${id}`);
  //   return res
  // }

  static async addScrape(data) {
    let res = await axios.post(`${BASE_URL}/scrapes`, { ...data });
    return res
  }

}

export default API;
