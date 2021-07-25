import './App.css';
import { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './pages/home'
import QuestionCreation from './pages/questions';
import QuestionTest from './pages/test';
import Result from './pages/result';
import Tests from './pages/tests'
import { Layout, Menu, Popover } from 'antd';
import { getUserRole } from './api/base';
import { UserOutlined, BellOutlined, AppstoreAddOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout;


function App() {
  const logout = () => {
    window.sessionStorage.removeItem("accessToken");
    window.location.href = 'http://localhost:3000';
    window.location.reload();
  };

  return (
    <Layout className="layout">
      <Header>
        <div>
          <div className="logo">
            <div className="logoImg"></div>
            <span>Hongkong University</span>
          </div>
          <div className="headerMenus">
            <div>
              <Popover placement="bottom" title={<span>{getUserRole()}</span>} content={<a onClick={logout}>Logout</a>} trigger="click">
                <UserOutlined size="large" />
              </Popover>
            </div>
            <div><BellOutlined size="large" /></div>
            <div><AppstoreAddOutlined size="large" /></div>
          </div>
        </div>
      </Header>
      <Router>
        <Content style={{ padding: '0px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/questions" component={QuestionCreation} />
              <Route path="/tests" component={Tests} />
              <Route path="/test/:id" component={QuestionTest} />
              <Route path="/result/:studentId/:questionId" component={Result} />
            </Switch>
          </div>
        </Content>
      </Router>
      <Footer style={{ textAlign: 'center' }}>design by liyiying</Footer>
    </Layout>
  );
}

export default App;
