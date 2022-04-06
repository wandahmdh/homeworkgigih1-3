import React, { useState } from "react";

export default function SongCard({ url, title, artist, select, toggle }) {
    const [isSelected, setIsSelected] = useState(select);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggle();
    };
  
  return (
      <div className="song">
          <img src={url} alt="Song Platlist" />
          <h4>{title}</h4>
          <p>{artist}</p>
          <button className='btn songCard'
          onClick={handleSelect}>
            {isSelected ? 'Deselect' : 'Select'}
          </button>    
      </div>
  )
}
