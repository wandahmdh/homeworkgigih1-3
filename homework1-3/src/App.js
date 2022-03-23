import './App.css'
import data from './data/data.js'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="song">
            <img 
              src={data.album.images[1].url} 
            />
            <h3>{data.album.name}</h3>
            <p>Artist: {data.album.artists[0].name}</p>
            <button>Select</button>
        </div>
    </div>
    </div>
  );
}

export default App;
