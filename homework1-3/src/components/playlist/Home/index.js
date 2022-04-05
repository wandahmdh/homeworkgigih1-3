import React, {Component} from 'react'
import SearchBar from '../SearchBar'
import SongCard from '../SongCard/SongCard';
import config from '../../utils/config'
import CreatePlaylist from '../CreatePlaylist';

const client_id = process.env.REACT_APP_SPOTIFY;

export default class Home extends Component{
    state = {
        accessToken: '',
        isAuthorize: false,
        tracks: [],
        selectedSong: '',
    };

    componentDidMount() {
        const accessToken = new URLSearchParams(window.location.hash).get(
            '#access_token'
        );

        this.setState({ accessToken, isAuthorize: accessToken !== null });
    }

    componentDidUpdate(prevProps, prevState) {
      console.log(this.state.selectedSong)  
    } 

    getSpotifyAuthorize() {
        const state = Date.now().toString();
        return `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&state=${state}&scope=${config.SPOTIFY_SCOPE}&redirect_uri=http://localhost:3000`
    }

    handleSuccessSearch(tracks) {
        this.setState({tracks});
    }

    render() {
        return (
            <div className='loginAuth'>
                {!this.state.isAuthorize && (
                    <div className='login'>
                        <p>Login to Spotify here</p>
                        <a href={this.getSpotifyAuthorize()} className='btnLogin'>Log in</a>
                    </div>
                )}

                {this.state.isAuthorize && (
                    <>
                        <h1 className='sposifyHeading'>Sposify</h1>
                        <>
                            <CreatePlaylist
                                accessToken={this.state.accessToken}
                                client_id={client_id}
                                uris={this.state.selectedSong}
                            />
                        </>

                        <SearchBar 
                            accessToken={this.state.accessToken}
                            onSuccess={(tracks) => this.handleSuccessSearch(tracks)}
                        />
                        {this.state.tracks.length === 0 && <p>No tracks searched</p>}

                        <div className='track-list'>
                            {this.state.tracks.map((tracks) => (
                                <SongCard
                                    key={tracks.id}
                                    url={tracks.album.images[0].url}
                                    title={tracks.name}
                                    artist={tracks.artists[0].name}
                                    uri={tracks.uri}
                                    selected={tracks.uri === this.state.selectedSong}
                                    onSelected={(uri) => this.setState({selectedSong: uri})}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        )
    }
}