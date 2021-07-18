import { Form, Select, Input, Button, Modal } from 'antd';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'
import { QuestionApi, AnswerApi, FileApi } from '../../api';

const { Option } = Select;
const { TextArea } = Input;

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
    const studentId = '1341341234234';
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
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { content, questionImage, courseId } = this.state;
    return (
      <div>
        <div className="logo">
          <h2>The University of Hong Kong</h2>
        </div>
        <div>
          <div>课程: {courseId} </div>
          <div>请问: {content} </div>
          <Drawer image={questionImage} ref={(drawer) => { this.drawerRef = drawer; }} />
          <Button type="primary" onClick={this.onFinish}>
            Submit
          </Button>
        </div>
        <Modal title="提交成功" okText="下一道题" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>相似度: {this.state.matchResult.similarity}</p>
          <p>中心点偏离: {this.state.matchResult.center_point_diff}</p>
          <p>面积覆盖比例: {this.state.matchResult.overlap_area_percentage}</p>
        </Modal>
      </div >
    )
  }
}

export default QuestionTest;