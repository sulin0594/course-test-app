import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import About from './pages/about'
import Home from './pages/home'
import QuestionCreation from './pages/questions';
import QuestionTest from './pages/test';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/questions" component={QuestionCreation} />
        <Route path="/test/:id" component={QuestionTest} />
      </Router>
    </div>
  );
}

export default App;
