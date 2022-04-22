import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from '../../../utils/fetchApi';
import { Button } from '@mui/material';


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
       <div className="form-playlist">
      <h3>Create Playlist</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label> <br></br>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title here"
            defaultValue={playlist.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label><br></br>
          <textarea
            placeholder="Enter description here"
            id="desc"
            name="description"
            defaultValue={playlist.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <Button 
            className="btn createPlaylist"
            variant="contained" 
            type='submit'>
              Submit
        </Button>
      </form>
    </div>
    </div>
   
  );
}