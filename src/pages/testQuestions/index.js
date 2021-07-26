import { Link } from 'react-router-dom';
import { Table, Modal, Space, Button, Select, Input, DatePicker, Transfer, Form } from 'antd';
import { LoadingOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { QuestionApi, TestsApi } from '../../api';
import moment from 'moment';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class TestQuestions extends Component {
  state = {
    testId: '',
    testName: '',
    beginDate: '',
    endDate: '',
    questions: [],
  };

  componentDidMount = async () => {
    await this.loadTest(this.props.match.params.id);
    await this.setState({ testId: this.props.match.params.id });
  }

  loadTest = async (testId) => {
    const resp = await TestsApi.getTest(testId);
    const questions = resp?.data.questions.map((v) => { v.key = v.id; return v });
    this.setState({ testName: resp.data.name, questions: questions });
  }

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
          <div className="title">
            <div>Test: {this.state.testName + '[' + this.state.testId + ']'}</div>
          </div>
          <Table dataSource={this.state.questions}>
            <Column title="id" dataIndex="id" key="id" />
            <Column title="content" dataIndex="content" key="content" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Link to={"/question/" + record.id}><a>Answer</a></Link>
                  <Link to={"/result/" + record.id}><a>result</a></Link>
                </Space>
              )}
            />
          </Table>
        </div>
      </div >
    )
  }
}

export default TestQuestions;