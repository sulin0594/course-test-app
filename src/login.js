import { Form, Input, Select, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginApi } from './api';

import './login.css';

const { Option } = Select;

function Login() {
  const onFinish = async (values) => {
    const loginResult = await LoginApi.login(values);
    if (loginResult.success) {
      window.sessionStorage.setItem('accessToken', loginResult.data);
      window.location.href = 'http://localhost:3000/#/home';
      window.location.reload();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="loginPanel">
        <div className="logo">
          <div className="logo-image"></div>
          <h2 className="header">The University of Hong Kong</h2>
        </div>
        <div>Welcome to use xxx application~</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true, role: 'student' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="loginForm"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true }]}
          >
            <Select size="large" defaultValue="student">
              <Option value="student">student</Option>
              <Option value="teacher">teacher</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="default" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}

export default Login;