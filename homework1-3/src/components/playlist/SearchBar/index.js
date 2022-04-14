import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from './../../../utils/fetchApi';
import { Container, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    <Container maxWidth="100%"> 
      <div className='searchBar'>
        <form className='searchForm' onSubmit={handleSubmit} >
          <TextField 
            className="searchField"
            id="outlined-basic" 
            type = 'text' 
            name='query' 
            placeholder='Search here'
            size= 'small'
            inputProps={{ style: { color: "white" } }}
            onChange={handleInput} required 
            defaultValue = {text}
          />
          <Button 
            className="btn SearchBar"
            variant="contained" 
            type='submit' 
            startIcon={ <SearchIcon /> }>
              Search
          </Button>
        </form>
        <Button variant="outlined" className="clearSearch" onClick={clearSearch}>Clear Search</Button>    
      </div>
    </Container>
  );
}

export {SearchBar}