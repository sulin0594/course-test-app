import { Form, Select, Input, message, Upload, Button, Modal } from 'antd';
import { Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { QuestionApi, FileApi } from '../../api';
import './tests.css';


class Tests extends Component {
  state = {
    loading: false,
    questionImage: '',
    isModalVisible: false,
  };
  drawerRef;

  back = async () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="tests">
        <div className="header">
          <ArrowLeftOutlined onClick={this.back} />
        </div>
        <div className="content">
          <div className="title">My tests: </div>
        </div>
      </div >
    )
  }
}

export default Tests;