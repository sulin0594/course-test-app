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
  static getQuestion = async (questionId) => {
    return client.get(`/questions/${questionId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static findAllByCourseId = async (courseId) => {
    return client.get(`/questions`, { params: { courseId } })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}