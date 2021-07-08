import { Form, Select, Input, message, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Component } from 'react';
import Drawer from '../../components/layer/drawer'

import { QuestionApi, FileApi } from '../../api';

const { Option } = Select;
const { TextArea } = Input;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

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
      couseId: values.course,
      content: values.content,
      questionImage: this.state.questionImage,
      questionImageAnswer: answerImageResp?.fileDownloadUri
    });
    console.log(resp);
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
      <div>
        <div className="logo">
          <h2>The University of Hong Kong</h2>
        </div>
        <div>
          <Form
            name="basic"
            onFinish={this.onFinish}
          >
            <Form.Item
              label="课程"
              name="course"
              rules={[{ required: true, message: 'Please select course!' }]}
            >
              <Select style={{ width: 120 }}>
                <Option value="001">课程1</Option>
                <Option value="002">课程2</Option>
                <Option value="003">课程3</Option>
              </Select>
            </Form.Item>
            <Form.Item label="问题内容" name="content" rules={[{ required: true, message: 'Please select course!' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="上传图片" name="image" rules={[{ required: true, message: 'Please upload image!' }]}>
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Drawer image={questionImage} ref={(drawer) => { this.drawerRef = drawer; }} />
        </div>
      </div >
    )
  }
}

export default QuestionCreation;