import React, { useEffect, useState } from "react";
import SearchBar from '../SearchBar'
import SongCard from '../SongCard/SongCard';
import config from '../../utils/config'
import CreatePlaylist from '../CreatePlaylist';
import { getUserProfile } from "../../utils/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/authSlice";

// const client_id = process.env.REACT_APP_SPOTIFY;

export default function Home() {
    const [tracks, setTracks] = useState([]);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessTokenParams = params.get("#access_token");

        if (accessTokenParams !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessTokenParams);
                    dispatch(
                        login({
                            accessToken: accessTokenParams,
                            user: response,
                        })
                    );
                } catch (e) {
                    alert(e);
                }
            };
            setUserProfile();
        }
    }, []);

    useEffect(() => {
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();

            setTracks(selectedTracks);
        }
    }, [selectedTrackURI]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY;

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };

    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSuccessSearch = (searchTracks) => {
        setIsSearch(true);

        const selectedSearchTracks = searchTracks.filter((data) =>
            selectedTrackURI.includes(data.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };

    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(
                selectedTrackURI.filter((item) => item !== uri)
            );
            setSelectedTracks(
                selectedTrackURI.filter((item) => item.uri !== uri)
            );
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

        return (
            <div className='loginAuth'>
                 {!isAuthorized && (
                    <div className='login'>
                        <p>Login to Spotify here</p>
                        <a href={getSpotifyLinkAuthorize()} className='btn btnLogin'>Log in</a>
                    </div>
                )}

                {isAuthorized && (
                    <>
                        <h1 className='sposifyHeading'>Sposify</h1>
                        <>
                            <CreatePlaylist
                                uris={selectedTrackURI}
                            />
                        </>

                        <SearchBar 
                            onSuccess={(tracks) => handleSuccessSearch(tracks)}
                            onClearSearch={clearSearch}
                        />
                        {tracks.length === 0 && <p>No tracks</p>}

                        <div className='track-list'>
                            {tracks.map((tracks) => (
                                <SongCard
                                    key={tracks.id}
                                    url={tracks.album.images[0].url}
                                    title={tracks.name}
                                    artist={tracks.artists[0].name}
                                    uri={tracks.uri}
                                    select={selectedTrackURI.includes(tracks.uri)}
                                    toggle={() => toggleSelect(tracks)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
