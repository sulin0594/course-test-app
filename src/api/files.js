import { client } from "./base";

export class FileApi {
  static uploadFileData = async (imageData) => {
    return client.post('/uploadFile/data', imageData)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}