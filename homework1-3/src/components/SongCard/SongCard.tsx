import React, { useState } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button } from "@mui/material";
import './SongCard.css';

interface SongCardProps {
  key: string;
  url: string;
  title: string;
  artist: string;
  select: boolean;
  toggle: () => void;
}

export default function SongCard({ key, url, title, artist, select, toggle } : SongCardProps) {
    const [isSelected, setIsSelected] = useState(select);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggle();
    };
  
  return (
      <div className="song">
        <ImageListItem key={key}>
          <img
            src={`${url}?w=120&fit=crop&auto=format`}
            srcSet={`${url}?w=120&fit=crop&auto=format&dpr=3 4x`}
            alt={title}
            loading="lazy"
          />
          <ImageListItemBar
            title={title}
            subtitle={<span>by: {artist}</span>}
            actionIcon={
              <Button
                sx={{ margin:'10px', color:'white' }}
                size='small'
                variant='contained'
                aria-label={`info about ${title}`}
                className='btn songCard'
                onClick={handleSelect}>
                {isSelected ? 'Deselect' : 'Select'}
              </Button>
            }
            position="bottom"
          />
        </ImageListItem>
        </div>
  )
}
