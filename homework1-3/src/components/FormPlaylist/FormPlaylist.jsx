import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from '../../utils/fetchApi';
import { Button } from '@mui/material';
import './FormPlaylist.css';


export default function FormPlaylist({ uris }) {
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const client_id = useSelector((state) => state.auth.client_id);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlaylist({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (playlist.title.length > 10) {
      try {
        const responsePlaylist = await createPlaylist(accessToken, client_id, {
          name: playlist.title,
          description: playlist.description,
        });

        await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

        setPlaylist({
          title: "",
          description: "",
        });

        alert("Playlist created successfully!");
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Title must be at least 10 characters long.");
    }
  };

  return (
    <div className="container">
      <form class="form" onSubmit={handleSubmit}>
        <div class="title">Welcome</div>
        <div class="subtitle">Let's create your playlist!</div>

        <div class="input-container ic1">
          <input 
            type="text"
            name="title"
            id="title"
            class="input" 
            defaultValue={playlist.title}
            onChange={handleChange}
            required
            placeholder=" " />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">Playlist name</label>
        </div>

        <div class="input-container ic2">
          <input 
            id="desc"
            class="input" 
            type="text" 
            name="description"
            defaultValue={playlist.description}
            onChange={handleChange}
            required
            placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">Description</label>
        </div>
        <Button 
            className="submit"
            variant="contained" 
            type='submit'>
              Submit
        </Button>
      </form>
    </div>
   
  );
}