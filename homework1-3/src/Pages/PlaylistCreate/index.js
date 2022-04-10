import React, { useEffect, useState } from "react";
import SongCard from "../../components/playlist/SongCard/SongCard";
import CreatePlaylist from "../../components/playlist/CreatePlaylist";
import SearchBar from './../../components/playlist/SearchBar/index';

export default function PlaylistCreate() {
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
    <>
      <hr />
    <h1>Sposify</h1>
      <SearchBar
        onSuccess={(tracks) => handleSuccessSearch(tracks)}
        onClearSearch={clearSearch}
      />

      {tracks.length === 0 && <p>No tracks</p>}

      <div className="track-list">
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
      </div>
      <CreatePlaylist uris={selectedTrackURI} />
    </>
  );
}