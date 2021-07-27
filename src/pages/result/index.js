import { Button, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'
import { QuestionApi, AnswerApi, FileApi } from '../../api';
import { getUserId } from '../../api/base';
import { Row, Col } from 'antd';

import './test.css';

const studentId = '1341341234234';

class Result extends Component {
  state = {
    questionId: '',
    studentId: '',
    question: {},
    answer: {},
  };

  componentDidMount = async () => {
    const { questionId } = this.props.match.params;
    const studentId = getUserId();
    await this.loadQuestion(questionId);
    await this.loadAnswer(studentId, questionId);
    await this.setState({ questionId, studentId });
  }

  loadQuestion = async (id) => {
    const resp = await QuestionApi.getQuestion(id);
    this.setState({ question: resp.data });
  }

  loadAnswer = async (studentId, questionId) => {
    const resp = await AnswerApi.getAnswer(studentId, questionId);
    if (!resp.data) {
      return this.back();
    }
    this.setState({ answer: resp.data });
  }

  back = async () => {
    this.props.history.goBack();
  }

  render() {
    const { content, courseId, questionImage, questionImageAnswer } = this.state.question;
    const { answerImage, correct, score } = this.state.answer;
    return (
      <div className="result">
        <div className="header">
          <ArrowLeftOutlined onClick={this.back} />
        </div>
        <div>
          <div className="title">问题作答结果: </div>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>Course: </Col>
            <Col span={4}> {courseId} </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>Question: </Col>
            <Col span={4}> {content} </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>我的答案: </Col>
            <Col span={20}>
              <div style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: '300px 200px',
                backgroundImage: `url(${questionImage})`,
                height: '200px',
                width: '300px',
              }}>
                <div style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '300px 200px',
                  backgroundImage: `url(${answerImage})`,
                  height: '200px',
                  width: '300px',
                }}></div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>预设答案: </Col>
            <Col span={20}>
              <div style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: '300px 200px',
                backgroundImage: `url(${questionImage})`,
                height: '200px',
                width: '300px',
              }}>
                <div style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '300px 200px',
                  backgroundImage: `url(${questionImageAnswer})`,
                  height: '200px',
                  width: '300px',
                }}></div>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col span={4} style={{ textAlign: 'right' }}>&nbsp;</Col>
            <Button type="primary" onClick={this.onFinish}>Submit</Button>
          </Row> */}
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>系统判定结果: </Col>
            <Col span={4}> {score} </Col>
          </Row>
        </div>
      </div >
    )
  }
}

export default Result;