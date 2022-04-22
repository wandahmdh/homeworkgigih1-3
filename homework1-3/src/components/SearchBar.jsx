import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from './../utils/fetchApi';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import './SearchBar.css'

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
          <input 
            className="searchField"
            id="outlined-basic" 
            type = 'text' 
            name='query' 
            placeholder='Search here'
            size= 'small'
            inputProps={{ style: { color: "white" } }}
            onChange={handleInput} required 
            defaultValue = {text}
            data-testid={"search-input"}
          />
          <Button 
            className="btnSearchBar"
            type='submit' 
            data test-id='search-button'
            startIcon={ <SearchIcon /> }>
              {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
          </Button>
        </form>
      </div>
      <div>
        <button variant="outlined" className="clearSearch" onClick={clearSearch}>Clear Search</button>    
      </div>
    </>
  );
}

export {SearchBar}