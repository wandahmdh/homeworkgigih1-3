import React, { useEffect, useState } from "react";
import SongCard from "../../components/SongCard/SongCard.tsx";
import FormPlaylist from "../../components/FormPlaylist/FormPlaylist";
import ImageList from '@mui/material/ImageList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './CreatePlaylist.css';

export default function CreatePlaylist() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrackURI, setSelectedTrackURI] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (!isSearch) {
      const selectedTracks = tracks.filter((track) => selectedTrackURI.includes(track.uri));

      setTracks(selectedTracks);
    }
  }, [selectedTrackURI, tracks, isSearch]);

  const handleSuccessSearch = (searchTracks) => {
    setIsSearch(true);

    const selectedSearchTracks = searchTracks.filter((data) =>
      selectedTrackURI.includes(data.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const clearSearch = () => {
    setTracks(selectedTracks);
    setIsSearch(false);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTrackURI.includes(uri)) {
      setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
      setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
    } else {
      setSelectedTrackURI([...selectedTrackURI, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  return (
    <div className="createPlaylist">
      <div className="header">
        <img src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' alt='logo'/> 
      </div>
      
      <div className="main">
        <FormPlaylist uris={selectedTrackURI} />    

        <SearchBar
          onSuccess={(tracks) => handleSuccessSearch(tracks)}
          onClearSearch={clearSearch}
        />
        {tracks.length === 0 && <p>No tracks</p>}

        <div className="track-list">
          <ImageList cols={5} gap={8}>
            {tracks.map((track) => (
              <SongCard
                key={track.id}
                url={track.album.images[0].url}
                title={track.name}
                artist={track.artists[0].name}
                select={selectedTrackURI.includes(track.uri)}
                toggle={() => toggleSelect(track)}
              />
            ))}
          </ImageList>
        </div>
      </div>
    </div>
  );
}