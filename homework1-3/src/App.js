import './App.css'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistCreate from './Pages/PlaylistCreate/index';
import Login from './Pages/Login/index';
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    allVariants: {
      color: 'white',
    }
  },
  palette: {
    primary: {
      main: '#27ae60',
    }
  }
})

function App() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;

