import { client, getUserId } from "./base";

export class TestsApi {
  static queryTests = async (courseId) => {
    return client.get(`/tests`, { params: { courseId } })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getTest = async (testid) => {
    return client.get(`/tests/${testid}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static newTest = async (test) => {
    return client.post(`/tests`, test)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}