import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LogIn from './components/login/login';
import SignUp from './components/signUp/SignUp';
import Dashboard from './components/dashboard/dashboard';
import handleCookie from './components/handleCookie/handleCookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  handleCookie.setCookie('esaUserToken','satyam');
  const userToken = handleCookie.getCookie('esaUserToken');
  let loggedStatus = false;

  if(userToken !== null && userToken !== undefined) {
    loggedStatus = true;
  }

  return (
    <div className="App">      
      <main className="row">
        <BrowserRouter>
          <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                      loggedStatus ?
                      <Redirect to="/home"></Redirect> :
                      <Redirect to="/login"></Redirect>
                    )
                }}
              />
            <Route exact path="/home" component={Dashboard} />
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
