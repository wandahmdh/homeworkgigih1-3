import './../../App.css'

const SongCard = ({title, artist, url, alt}) => {
  return (
      <div  className="song">
          <img src={url} alt={alt} />
          <h4>{title}</h4>
          <p>{artist}</p>
      </div>
  )
}

export default SongCard