import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from './../utils/fetchApi';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, IconButton } from "@mui/material";
import './SearchBar.css';


export default function SearchBar({ onSuccess, onClearSearch }) {
  const [text, setText] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleInput = (e) => {
      setText(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const responseSearch = await searchTrack(text, accessToken);

          const tracks = responseSearch.tracks.items;
          onSuccess(tracks);
      } catch (e) {
          alert(e);
      }
  };

  const clearSearch = () => {
      setText("");
      onClearSearch();
  };

  return (
    <>
      <div className='searchBar' id='searchBar'>
        <form className='searchForm' onSubmit={handleSubmit} >
          <TextField  
            className="searchField"
            id="standard-basic"
            variant="standard"
            type = 'text' 
            name='query' 
            color= 'secondary'
            placeholder='Search here'
            inputProps={{ style: { color: "black" } }}
            onChange={handleInput} required 
            defaultValue = {text}
          />
          <IconButton 
            type="submit" 
            aria-label="search"
            className="btnSearchBar"
            edge="end"
            >
            <SearchIcon />
          </IconButton>
        </form>
      </div>
      <div className="clearSearch" >
        <Button 
          color= 'secondary'
          variant="text" 
          size="small"
          margin= '20px'
          onClick={clearSearch}>
            Clear Search
        </Button>    
      </div>
    </>
  );
}

export {SearchBar}