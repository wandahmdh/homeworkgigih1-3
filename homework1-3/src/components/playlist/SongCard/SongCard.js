const SongCard = ({authUrl, title, artist, url, alt}) => {
  return (
      <div  className="song">
          <h1>Spotify Playlist</h1>
          <a className='btnLogin' href={authUrl}>Sign In</a>
          <img src={url} alt={alt} />
          <h4>{title}</h4>
          <p>{artist}</p>
      </div>
  )
}

export default SongCard