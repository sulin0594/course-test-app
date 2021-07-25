import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { getUserName, getUserRole } from '../../api/base';
import { FormOutlined, CopyOutlined, SnippetsOutlined, HighlightOutlined, AppstoreAddOutlined, IdcardOutlined, FieldTimeOutlined } from '@ant-design/icons'

import './home.css';

function Home() {
  return (
    <div className="homeContainer">
      <div className="homeTitle">
        <div>WORK TOGETHER.</div>
        <div className="welcome">
          <div className="welcomeBar"><span>Welcome,&nbsp;&nbsp;</span><a>{getUserName()}</a> </div>
        </div>
      </div>
      <div className="home">
        <div className="content">
          <div className="todo">
            <span>待处理事项: </span>
            <span>3</span>
            <div>
              xxxxxxxxxxxxxxxxxxxxxxx
            </div>
            <div>
              yyyyyyyyyyyyyyyyyyy
            </div>
          </div>
          <div className="applications">
            <div className="app-title">
              <AppstoreAddOutlined />
              <span>应用程序</span>
            </div>
            <div className="apps">
              {getUserRole() === 'teacher' ?
                <>
                  <div className="app">
                    <Link to="/questions">
                      <FormOutlined />
                      <div>出题</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/tests">
                      <CopyOutlined />
                      <div>测试</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <SnippetsOutlined />
                      <div>结果</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <FieldTimeOutlined />
                      <div>安排</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <IdcardOutlined />
                      <div>我的</div>
                    </Link>
                  </div>
                </>
                :
                <>
                  <div className="app">
                    <Link to="/test">
                      <HighlightOutlined />
                      <div>做题</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/result">
                      <SnippetsOutlined />
                      <div>成绩</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <FieldTimeOutlined />
                      <div>安排</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <IdcardOutlined />
                      <div>我的</div>
                    </Link>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home;