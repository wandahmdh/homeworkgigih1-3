const SongCard = ({authUrl, title, artist, url, alt, uri, selected, onSelected}) => {
  return (
      <div className="song">
          <img src={url} alt={alt} />
          <h4>{title}</h4>
          <p>{artist}</p>
          <button onClick={() => onSelected(uri)}>
            {selected ? 'Deselect' : 'Select'}
          </button>    
      </div>
  )
}

export default SongCard