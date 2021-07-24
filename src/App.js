import './App.css';
import { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './pages/home'
import QuestionCreation from './pages/questions';
import QuestionTest from './pages/test';
import Result from './pages/result';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


function App() {
  return (
    <Layout className="layout">
      <Router>
        <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key={'0'}><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key={'1'}><Link to="/questions">Questions</Link></Menu.Item>
            {/* <Menu.Item key={'2'}><Link to="about">About</Link></Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '20px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/questions" component={QuestionCreation} />
              <Route path="/test/:id" component={QuestionTest} />
              <Route path="/result/:studentId/:questionId" component={Result} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>design by liyiying</Footer>
      </Router>
    </Layout>
  );
}

export default App;
