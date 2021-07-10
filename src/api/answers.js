import { client } from "./base";

export class AnswerApi {
  static answer = async (studentId, questionId, answer) => {
    return client.post(`/answers/${studentId}/${questionId}`, answer)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}