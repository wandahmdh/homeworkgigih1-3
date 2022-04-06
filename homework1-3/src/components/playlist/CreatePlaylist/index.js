import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../../utils/fetchApi";

export default function CreatePlaylist({ uris }) {
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
            value={playlist.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label><br></br>
          <textarea
            id="desc"
            name="description"
            value={playlist.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="btn createPlaylist" type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
   
  );
}