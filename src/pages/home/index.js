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
            <span>Pending tasks: </span>
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
              <span>Application</span>
            </div>
            <div className="apps">
              {getUserRole() === 'teacher' ?
                <>
                  <div className="app">
                    <Link to="/questions">
                      <FormOutlined />
                      <div>New</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/tests">
                      <CopyOutlined />
                      <div>Test</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <SnippetsOutlined />
                      <div>Result</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <FieldTimeOutlined />
                      <div>Arrangement</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <IdcardOutlined />
                      <div>Mine</div>
                    </Link>
                  </div>
                </>
                :
                <>
                  <div className="app">
                    <Link to="/test">
                      <HighlightOutlined />
                      <div>Question</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/result">
                      <SnippetsOutlined />
                      <div>Score</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <FieldTimeOutlined />
                      <div>Arrangement</div>
                    </Link>
                  </div>
                  <div className="app">
                    <Link to="/questions">
                      <IdcardOutlined />
                      <div>Mine</div>
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