import { Link } from 'react-router-dom';
import { Table, Modal, Space, Button, Select, Input, DatePicker, Transfer, Form } from 'antd';
import { LoadingOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { QuestionApi, TestsApi } from '../../api';
import moment from 'moment';
import './tests.css';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class Tests extends Component {
  state = {
    data: [],
    isModalVisible: false,
    questions: [],
    courseId: '',
    newTestName: '',
    dateRange: [],
    selectQuestions: [],
  };

  componentDidMount = async () => {
    await this.loadTests();
  }

  loadTests = async () => {
    const resp = await TestsApi.queryTests();
    const tests = resp?.data.map((v) => { v.key = v.id; return v });
    this.setState({ data: tests });
  }

  newTest = async () => {
    this.setState({ isModalVisible: true });
  }

  handleOk = async () => {
    const { courseId, newTestName, dateRange, selectQuestions } = this.state;
    const resp = await TestsApi.newTest({
      courseId: Number(courseId),
      name: newTestName,
      beginDate: dateRange[0].format('YYYY-MM-DD 00:00:00'),
      endDate: dateRange[1].format('YYYY-MM-DD 23:59:59'),
      questions: selectQuestions.map((v) => { return { id: v } }),
    });
    console.log(resp);
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ selectQuestions: targetKeys });
  };

  onCourseChange = async (courseId) => {
    const resp = await QuestionApi.findAllByCourseId(courseId);
    const questions = resp?.data.map((v) => { v.key = `${v.id}`; return v });
    this.setState({ courseId, questions });
  };

  onValuesChange = async (values, allValues) => {
    this.setState({ ...allValues });
  }

  back = async () => {
    this.props.history.goBack();
  }

  navigateToTestQuesions = async () => {

  }

  render() {
    return (
      <div className="tests">
        <div className="header">
          <ArrowLeftOutlined onClick={this.back} />
        </div>
        <div className="content">
          <div className="title">
            <span>My tests: </span>
            <div style={{ float: 'right' }}>
              <Button type="primary" onClick={this.newTest}>Create</Button>
            </div>
          </div>
          <Table dataSource={this.state.data}>
            <Column title="course" dataIndex="courseId" key="courseId" />
            <Column title="name" dataIndex="name" key="name" />
            <Column title="start time" dataIndex="beginDate" key="beginDate" />
            <Column title="end time" dataIndex="endDate" key="endDate" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <a>Edit</a>
                  <Link to={"/test/" + record.id}><a>Answer</a></Link>
                </Space>
              )}
            />
          </Table>
        </div>
        <Modal title="New Test" okText="Create" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} width={1000}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onValuesChange={this.onValuesChange}
          >
            <Form.Item
              label="Course Name"
              name="course"
              rules={[{ required: true, message: 'Please select course!' }]}
            >
              <Select style={{ width: 160 }} onChange={this.onCourseChange}>
                <Option value="1001001">ELEC6002</Option>
                <Option value="1001002">ELEC6003</Option>
                <Option value="1001003">ELEC6004</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Test Name" name="newTestName" rules={[{ required: true, message: 'Please select course!' }]}>
              <Input placeholder="Test Name" />
            </Form.Item>
            <Form.Item label="Date Range" name="dateRange" rules={[{ required: true, message: 'Please select course!' }]}>
              <RangePicker
                format={dateFormat}
                onChange={this.onDateRangeChange}
              />
            </Form.Item>
          </Form>
          <Transfer
            dataSource={this.state.questions}
            listStyle={{
              width: 800,
              height: 400,
            }}
            operations={['to right', 'to left']}
            targetKeys={this.state.selectQuestions}
            onChange={this.handleChange}
            render={item => `${item.id}-${item.content}`}
            pagination
          />
        </Modal>
      </div >
    )
  }
}

export default Tests;