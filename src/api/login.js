import { client } from "./base";

export class LoginApi {
  static login = async (loginCredential) => {
    return client.post('/user/login', loginCredential)
      .then(function (response) {
        return response.data || {};
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}