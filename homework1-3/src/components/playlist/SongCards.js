import SongCard from "./SongCard";
import dataAlbum from "./data/dataAlbum";

const SongCards = () => {
    return dataAlbum.map((e) => (
        <SongCard key={e.id} 
        url={e.album.images[1].url} 
        title={e.name} 
        artist={e.artists[0].name} 
        />
    ))
}

export default SongCards