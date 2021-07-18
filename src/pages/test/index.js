import { Button, Modal } from 'antd';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'
import { QuestionApi, AnswerApi, FileApi } from '../../api';
import { Row, Col } from 'antd';

import './test.css';

const studentId = '1341341234234';
class QuestionTest extends Component {
  state = {
    questionId: '',
    questionImage: '',
    isModalVisible: false,
    matchResult: {},
  };
  drawerRef;

  componentDidMount = async () => {
    await this.loadQuestion(this.props.match.params.id);
    await this.setState({ questionId: this.props.match.params.id });
  }

  loadQuestion = async (id) => {
    const resp = await QuestionApi.getQuestion(id);
    this.setState({ ...resp.data });
  }

  onFinish = async (values) => {

    const answerImageResp = await FileApi.uploadFileData({ data: this.drawerRef.stageRef.toDataURL() });
    const resp = await AnswerApi.answer(studentId, this.state.questionId, {
      answerImage: answerImageResp?.fileDownloadUri
    });
    if (resp?.success) {
      this.setState({ isModalVisible: true, matchResult: resp.data });
    }
  }

  handleOk = () => {
    this.setState({ isModalVisible: false });
    this.navigateToResultPage(studentId, this.state.questionId);
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
    this.navigateToResultPage(studentId, this.state.questionId);
  };

  navigateToResultPage = async (studentId, questionId) => {
    this.props.history.push(`/result/${studentId}/${questionId}`);
  }


  render() {
    const { content, questionImage, courseId } = this.state;
    return (
      <div className="test">
        <div className="logo">
          <div className="logo-image"></div>
          <h2 className="header">The University of Hong Kong</h2>
        </div>
        <div>
          <div className="title">请作答以下问题: </div>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>Course: </Col>
            <Col span={4}> {courseId} </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>Question: </Col>
            <Col span={4}> {content} </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4} style={{ textAlign: 'right', paddingRight: '30px' }}>Answer:</Col>
            <Drawer image={questionImage} ref={(drawer) => { this.drawerRef = drawer; }} />
          </Row>
          <Row>
            <Col span={4} style={{ textAlign: 'right' }}>&nbsp;</Col>
            <Button type="primary" onClick={this.onFinish}>Submit</Button>
          </Row>
        </div>
        <Modal title="提交成功" okText="查看结果" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>相似度: {this.state.matchResult.similarity}</p>
          <p>中心点偏离: {this.state.matchResult.center_point_diff}</p>
          <p>面积覆盖比例: {this.state.matchResult.overlap_area_percentage}</p>
        </Modal>
      </div >
    )
  }
}

export default QuestionTest;