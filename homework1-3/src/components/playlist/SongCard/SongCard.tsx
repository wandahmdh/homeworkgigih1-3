import React, { useState } from "react";

interface SongCardProps {
  url: string;
  title: string;
  artist: string;
  select: boolean;
  toggle: () => void;
}

export default function SongCard({ url, title, artist, select, toggle } : SongCardProps) {
    const [isSelected, setIsSelected] = useState(select);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggle();
    };
  
  return (
      <div className="song">
        <div className="song-item">
          <img src={url} alt="Song Playlist" className="playlist-image"/>
          <div className="song-info">
            <h4>{title}</h4> 
            <p>{artist}</p>
            <button className='btn songCard'
            onClick={handleSelect}>
              {isSelected ? 'Deselect' : 'Select'}
            </button>    
          </div>
        </div>
      </div>
  )
}
