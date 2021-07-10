import { Form, Select, Input, Button } from 'antd';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'
import { QuestionApi, AnswerApi, FileApi } from '../../api';

const { Option } = Select;
const { TextArea } = Input;

class QuestionTest extends Component {
  state = {
    questionId: '',
    questionImage: '',
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
  }

  render() {
    const { content, questionImage } = this.state;
    return (
      <div>
        <div className="logo">
          <h2>The University of Hong Kong</h2>
        </div>
        <div>
          <Form
            name="basic"
            onFinish={this.onFinish} >
            <Form.Item
              label="课程"
              name="course"
              rules={[{ required: true, message: 'Please select course!' }]} >
              <Select style={{ width: 120 }}>
                <Option value="001">课程1</Option>
                <Option value="002">课程2</Option>
                <Option value="003">课程3</Option>
              </Select>
            </Form.Item>
            <Form.Item label="问题内容" name="content" value={content} rules={[{ required: true, message: 'Please select course!' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Drawer image={questionImage} ref={(drawer) => { this.drawerRef = drawer; }} />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div >
    )
  }
}

export default QuestionTest;