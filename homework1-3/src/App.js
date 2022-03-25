import './App.css'
import Image from './components/playlist/images/index'
import Title from './components/playlist/title/index'
import Artist from './components/playlist/artist/index'
import Button from './components/playlist/button/index'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="song">
            <Image />
            <Title />
            <Artist />
            <Button />
        </div>
    </div>
    </div>
  );
}

export default App;

