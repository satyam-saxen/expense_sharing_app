import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import LogIn from './components/login/login';
import SignUp from './components/signUp/SignUp';

function App() {
  return (
    <div className="App">      
      <main className="row">
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/home"]} component={Homepage} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
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
