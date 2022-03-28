import './App.css'
import SongCards from './components/playlist/SongCards'
import Button from './components/playlist/button/index'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div>
            <SongCards />
            <Button />
        </div>
      </div>
    </div>
  );
}

export default App;

