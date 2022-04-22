import './App.css'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePlaylist from './Pages/CreatePlaylist/CreatePlaylist';
import Login from './Pages/Login/Login';
import { ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme({
  typography: {
    allVariants: {
      color: 'black',
    }
  },
  palette: {
    primary: {
      main: '#27ae60',
    },
    secondary: {
      main: '#ffffff',
    }
  }
})

function App() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div className="App">
            <Switch>
              <Route path="/create-playlist" exact>
                {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
              </Route>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

