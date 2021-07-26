import { Form, Select, Input, message, Upload, Button, Modal } from 'antd';
import { Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'
import { QuestionApi, FileApi } from '../../api';
import './question.css';

const { Option } = Select;
const { TextArea } = Input;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class QuestionCreation extends Component {
  state = {
    loading: false,
    questionImage: '',
    isModalVisible: false,
  };
  drawerRef;

  componentDidMount() {
    console.log(this.drawerRef); // 访问挂载在组件上ref
  }

  handleImageChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ questionImage: info.file.response.fileDownloadUri });
    }
  };

  onFinish = async (values) => {
    const answerImageResp = await FileApi.uploadFileData({ data: this.drawerRef.stageRef.toDataURL() });
    const resp = await QuestionApi.createQuestion({
      courseId: new Number(values.course),
      content: values.content,
      questionImage: this.state.questionImage,
      questionImageAnswer: answerImageResp?.fileDownloadUri
    });
    if (resp.success) {
      // this.navigateToTestPage(resp.data);
      this.setState({ isModalVisible: true });
    }
  }

  handleOk = () => {
    this.setState({ isModalVisible: false });
    window.location.reload();
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
    this.navigateToHomePage();
  }

  navigateToTestPage = async (questionId) => {
    this.props.history.push(`/test/${questionId}`);
  }

  navigateToHomePage = async (questionId) => {
    this.props.history.push(`/home`);
  }

  back = async () => {
    this.props.history.goBack();
  }

  render() {
    const { loading, questionImage } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="questions">
        <div className="header">
          <ArrowLeftOutlined onClick={this.back} />
        </div>
        <div className="content">
          <div className="title">Please set your question: </div>
          <Form
            name="basic"
            onFinish={this.onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Course Name"
              name="course"
              rules={[{ required: true, message: 'Please select course!' }]}
            >
              <Select style={{ width: 160 }}>
                <Option value="1001001">ELEC6002</Option>
                <Option value="1001002">ELEC6003</Option>
                <Option value="1001003">ELEC6004</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Set question content" name="content" rules={[{ required: true, message: 'Please select course!' }]}>
              <TextArea rows={4} showCount maxLength={200} />
            </Form.Item>
            <Form.Item label="Upload question image" name="image" rules={[{ required: true, message: 'Please upload image!' }]}>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:6001/uploadFile"
                beforeUpload={beforeUpload}
                onChange={this.handleImageChange}
              >
                {questionImage ? <img src={questionImage} alt="file" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
            {questionImage ? <>
              <Row>
                <Col span={4} style={{ textAlign: 'right' }}>Please draw correct answer: </Col>
                <Drawer image={questionImage} ref={(drawer) => { this.drawerRef = drawer; }} />
              </Row>
            </> : <></>}
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
        <Modal title="The question has been set successfully !" okText="Next question" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>The question has been set successfully, do you want to set a new question?</p>
        </Modal>
      </div >
    )
  }
}

export default QuestionCreation;