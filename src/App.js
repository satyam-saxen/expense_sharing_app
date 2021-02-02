import './App.css';
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './components/homepage/homepage';
import SignUp from './components/signUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">      
      <main className="row">
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/home"]} component={Homepage} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </main>
      <footer>
        <div>Presented By Technogise Interns 2k21</div>
      </footer>
    </div>
    
  );
}

export default App;
