import './App.css'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistCreate from './components/playlist/Home/Pages/PlaylistCreate';
import Login from './components/playlist/Home/Pages/Login';

function App() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div>
            <Switch>
              <Route path="/create-playlist" exact>
                {isAuthorized ? <PlaylistCreate /> : <Redirect to="/" />}
              </Route>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      
    </Router>
  );
}

export default App;

