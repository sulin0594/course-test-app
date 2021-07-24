import { client, getUserId } from "./base";

export class AnswerApi {
  static answer = async (studentId, questionId, answer) => {
    return client.post(`/answers/${getUserId()}/${questionId}`, answer)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getAnswer = async (studentId, questionId) => {
    return client.get(`/answers/${getUserId()}/${questionId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}