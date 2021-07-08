import { client } from "./base";

export class QuestionApi {
  static createQuestion = async (question) => {
    return client.post('/questions', question)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}