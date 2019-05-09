//main file to make all AJAX calls to the server.

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

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

  //get all questions from server returns array of question objects
  static async getQuestions() {
    let res = await this.request(`questions`);
    return res;
  }

  //add user passing in type and data
  static async addUser(data) {
    let res = await this.request('user',data,'post');
    return res;
  }

}

export default API;
