import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from "../../utils/fetchApi";

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
    <div className='searchBar'>
      <form className='searchForm' onSubmit={handleSubmit} >
        <input 
          className='search'
          type = 'text' name='query' placeholder='Search here'
          onChange={handleInput} required value = {text}
        />
        <input type='submit' className='btn searchBtn' value="Search" />
      </form>
      <button className="btn clearSearch" onClick={clearSearch}>Clear Search</button>     
    </div>
  );
}

export {SearchBar}