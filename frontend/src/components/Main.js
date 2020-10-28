import React, {useEffect, useState} from 'react';
import { Paper } from '@material-ui/core';
import styles from '../modules/Main.module.css';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true

const Main = () => {
    const [query, setQuery] = useState("")
    const [errs, setErrs] = useState("")
    const [_csrfToken, set_csrfToken] = useState(null);
    const [songOne, setSongOne] = useState();
    const [songOneImage, setSongOneImage] = useState();
    const [songOneArtist, setSongOneArtist] = useState()
    const [songTwo, setSongTwo] = useState();
    const [songTwoImage, setSongTwoImage] = useState();
    const [songTwoArtist, setSongTwoArtist] = useState()
    const [songThree, setSongThree] = useState();
    const [songThreeImage, setSongThreeImage] = useState();
    const [songThreeArtist, setSongThreeArtist] = useState()
    const [songFour, setSongFour] = useState();
    const [songFourImage, setSongFourImage] = useState();
    const [songFourArtist, setSongFourArtist] = useState()
    const [songFive, setSongFive] = useState();
    const [songFiveImage, setSongFiveImage] = useState();
    const [songFiveArtist, setSongFiveArtist] = useState()
    const [songOneUri, setSongOneUri] = useState();
    const [songTwoUri, setSongTwoUri] = useState();
    const [songThreeUri, setSongThreeUri] = useState();
    const [songFourUri, setSongFourUri] = useState();
    const [songFiveUri, setSongFiveUri] = useState();
    const [playlistOne, setPlaylistOne] = useState();
    const [playlistOneImage, setPlaylistOneImage] = useState();
    const [playlistOneArtist, setPlaylistOneArtist] = useState();
    const [playlistTwo, setPlaylistTwo] = useState();
    const [playlistTwoImage, setPlaylistTwoImage] = useState();
    const [playlistTwoArtist, setPlaylistTwoArtist] = useState();
    const [playlistThree, setPlaylistThree] = useState();
    const [playlistThreeImage, setPlaylistThreeImage] = useState();
    const [playlistThreeArtist, setPlaylistThreeArtist] = useState();
    const [playlistFour, setPlaylistFour] = useState();
    const [playlistFourImage, setPlaylistFourImage] = useState();
    const [playlistFourArtist, setPlaylistFourArtist] = useState();
    const [playlistFiveImage, setPlaylistFiveImage] = useState();
    const [playlistFive, setPlaylistFive] = useState();
    const [playlistFiveArtist, setPlaylistFiveArtist] = useState();
    const [playlistList, setPlaylistList] = useState();
    const API_HOST = 'http://localhost:8000';

    const getCsrfToken = () => {
        if (_csrfToken === null) {
            axios.get(`${API_HOST}/csrf/`, {
                credentials: 'include',
            })
                .then((res) => {
                    set_csrfToken(res.data.csrfToken);
                })
        }
        // console.log(_csrfToken)
        return _csrfToken;
    }

    var songInitial = null

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(_csrfToken);
        axios({
                method: 'POST',
                url: `${API_HOST}/search`,
                data: {
                    // withCredentials: true,
                    search_query: query
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                songInitial = res
                setSongOne(songInitial.data.response.list_songs.tracks.items[0].name)
                setSongOneImage(songInitial.data.response.list_songs.tracks.items[0].album.images[1].url)
                setSongOneArtist(songInitial.data.response.list_songs.tracks.items[0].artists[0].name)
                setSongTwo(songInitial.data.response.list_songs.tracks.items[1].name)
                setSongTwoImage(songInitial.data.response.list_songs.tracks.items[1].album.images[2].url)
                setSongTwoArtist(songInitial.data.response.list_songs.tracks.items[1].artists[0].name)
                setSongThree(songInitial.data.response.list_songs.tracks.items[2].name)
                setSongThreeImage(songInitial.data.response.list_songs.tracks.items[2].album.images[2].url)
                setSongThreeArtist(songInitial.data.response.list_songs.tracks.items[2].artists[0].name)
                setSongFour(songInitial.data.response.list_songs.tracks.items[3].name)
                setSongFourImage(songInitial.data.response.list_songs.tracks.items[3].album.images[2].url)
                setSongFourArtist(songInitial.data.response.list_songs.tracks.items[3].artists[0].name)
                setSongFive(songInitial.data.response.list_songs.tracks.items[4].name)
                setSongFiveImage(songInitial.data.response.list_songs.tracks.items[4].album.images[2].url)
                setSongFiveArtist(songInitial.data.response.list_songs.tracks.items[4].artists[0].name)
                setSongOneUri(songInitial.data.response.list_songs.tracks.items[0].uri)
                setSongTwoUri(songInitial.data.response.list_songs.tracks.items[1].uri)
                setSongThreeUri(songInitial.data.response.list_songs.tracks.items[2].uri)
                setSongFourUri(songInitial.data.response.list_songs.tracks.items[3].uri)
                setSongFiveUri(songInitial.data.response.list_songs.tracks.items[4].uri)
            })
            .catch((err) => console.log(err))
    };
    const onChangeHandler = (e) => {
        setQuery(e.target.value)
    }
    const selectOneHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    select_uri: songOneUri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                setPlaylistOne(res.data.response.recommended_songs.tracks[0].name)
                setPlaylistTwo(res.data.response.recommended_songs.tracks[1].name)
                setPlaylistThree(res.data.response.recommended_songs.tracks[2].name)
                setPlaylistFour(res.data.response.recommended_songs.tracks[3].name)
                setPlaylistFive(res.data.response.recommended_songs.tracks[4].name)
                setPlaylistOneImage(res.data.response.recommended_songs.tracks[0].album.images[2].url)
                setPlaylistTwoImage(res.data.response.recommended_songs.tracks[1].album.images[2].url)
                setPlaylistThreeImage(res.data.response.recommended_songs.tracks[2].album.images[2].url)
                setPlaylistFourImage(res.data.response.recommended_songs.tracks[3].album.images[2].url)
                setPlaylistFiveImage(res.data.response.recommended_songs.tracks[4].album.images[2].url)
                setPlaylistOneArtist(res.data.response.recommended_songs.tracks[0].artists[0].name)
                setPlaylistTwoArtist(res.data.response.recommended_songs.tracks[1].artists[0].name)
                setPlaylistThreeArtist(res.data.response.recommended_songs.tracks[2].artists[0].name)
                setPlaylistFourArtist(res.data.response.recommended_songs.tracks[3].artists[0].name)
                setPlaylistFiveArtist(res.data.response.recommended_songs.tracks[4].artists[0].name)
            })
            .catch((err) => console.log(err))
    }
    const selectTwoHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    select_uri: songTwoUri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                setPlaylistOne(res.data.response.recommended_songs.tracks[0].name)
                setPlaylistTwo(res.data.response.recommended_songs.tracks[1].name)
                setPlaylistThree(res.data.response.recommended_songs.tracks[2].name)
                setPlaylistFour(res.data.response.recommended_songs.tracks[3].name)
                setPlaylistFive(res.data.response.recommended_songs.tracks[4].name)
                setPlaylistOneImage(res.data.response.recommended_songs.tracks[0].album.images[2].url)
                setPlaylistTwoImage(res.data.response.recommended_songs.tracks[1].album.images[2].url)
                setPlaylistThreeImage(res.data.response.recommended_songs.tracks[2].album.images[2].url)
                setPlaylistFourImage(res.data.response.recommended_songs.tracks[3].album.images[2].url)
                setPlaylistFiveImage(res.data.response.recommended_songs.tracks[4].album.images[2].url)
            })
            .catch((err) => console.log(err))
    }
    const selectThreeHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    select_uri: songThreeUri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                setPlaylistOne(res.data.response.recommended_songs.tracks[0].name)
                setPlaylistTwo(res.data.response.recommended_songs.tracks[1].name)
                setPlaylistThree(res.data.response.recommended_songs.tracks[2].name)
                setPlaylistFour(res.data.response.recommended_songs.tracks[3].name)
                setPlaylistFive(res.data.response.recommended_songs.tracks[4].name)
                setPlaylistOneImage(res.data.response.recommended_songs.tracks[0].album.images[2].url)
                setPlaylistTwoImage(res.data.response.recommended_songs.tracks[1].album.images[2].url)
                setPlaylistThreeImage(res.data.response.recommended_songs.tracks[2].album.images[2].url)
                setPlaylistFourImage(res.data.response.recommended_songs.tracks[3].album.images[2].url)
                setPlaylistFiveImage(res.data.response.recommended_songs.tracks[4].album.images[2].url)
            })
            .catch((err) => console.log(err))
    }
    const selectFourHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    select_uri: songFourUri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                setPlaylistOne(res.data.response.recommended_songs.tracks[0].name)
                setPlaylistTwo(res.data.response.recommended_songs.tracks[1].name)
                setPlaylistThree(res.data.response.recommended_songs.tracks[2].name)
                setPlaylistFour(res.data.response.recommended_songs.tracks[3].name)
                setPlaylistFive(res.data.response.recommended_songs.tracks[4].name)
                setPlaylistOneImage(res.data.response.recommended_songs.tracks[0].album.images[2].url)
                setPlaylistTwoImage(res.data.response.recommended_songs.tracks[1].album.images[2].url)
                setPlaylistThreeImage(res.data.response.recommended_songs.tracks[2].album.images[2].url)
                setPlaylistFourImage(res.data.response.recommended_songs.tracks[3].album.images[2].url)
                setPlaylistFiveImage(res.data.response.recommended_songs.tracks[4].album.images[2].url)
            })
            .catch((err) => console.log(err))
    }
    const selectFiveHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    select_uri: songFiveUri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
                setPlaylistOne(res.data.response.recommended_songs.tracks[0].name)
                setPlaylistTwo(res.data.response.recommended_songs.tracks[1].name)
                setPlaylistThree(res.data.response.recommended_songs.tracks[2].name)
                setPlaylistFour(res.data.response.recommended_songs.tracks[3].name)
                setPlaylistFive(res.data.response.recommended_songs.tracks[4].name)
                setPlaylistOneImage(res.data.response.recommended_songs.tracks[0].album.images[2].url)
                setPlaylistTwoImage(res.data.response.recommended_songs.tracks[1].album.images[2].url)
                setPlaylistThreeImage(res.data.response.recommended_songs.tracks[2].album.images[2].url)
                setPlaylistFourImage(res.data.response.recommended_songs.tracks[3].album.images[2].url)
                setPlaylistFiveImage(res.data.response.recommended_songs.tracks[4].album.images[2].url)
            })
            .catch((err) => console.log(err))
    }
    console.log(playlistOne)
    useEffect(() => {set_csrfToken(getCsrfToken())}, )
    return(
        <>
            <div>
                <div className="row d-flex justify-content-around">
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <h1 className={`${styles.header}`}>Enter a song</h1>
                        <form onSubmit={submitHandler}>
                            <input type="text" name="search_query" className={`${styles.songField} mb-3`} placeholder="Song..." onChange={onChangeHandler} ></input>
                            <Button type="submit" className={`${styles.button}`}>Search</Button>
                        </form>
                        <p>How should we make your playlist?</p>
                        <select name="playlistType" className={`mt-0 ${styles.selectField}`}>
                            <option value="BPM">BPM</option>
                            <option value="Tempo">Tempo</option>
                            <option value="Energy">Energy</option>
                        </select>
                    </Paper>
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <h1 className={`${styles.header}`}>Songs</h1>
                        <Paper name='selected_track' id="selected_track" className={`${styles.card}`} onClick={selectOneHandler}>
                            <Grid container direction="row" justify="flex-start" alignItems="stretch">
                                <Grid item xs={5}>
                                    <img src={songOneImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{songOne}</p>
                                    <p>{songOneArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper name='selected_track' id="selected_track" className={`${styles.card}`} onClick={selectTwoHandler}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={songTwoImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{songTwo}</p>
                                    <p>{songTwoArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper name='selected_track' id="selected_track" className={`${styles.card}`} onClick={selectThreeHandler}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={songThreeImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{songThree}</p>
                                    <p>{songThreeArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper name='selected_track' id="selected_track" className={`${styles.card}`} onClick={selectFourHandler}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={songFourImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{songFour}</p>
                                    <p>{songFourArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper name='selected_track' id="selected_track" className={`${styles.card}`} onClick={selectFiveHandler}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={songFiveImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{songFive}</p>
                                    <p>{songFiveArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <h1 className={`${styles.header}`}>Your Playlist</h1>
                        <Paper className={`${styles.card}`}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={playlistOneImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{playlistOne}</p>
                                    <p>{playlistOneArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={`${styles.card}`}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={playlistTwoImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{playlistTwo}</p>
                                    <p>{playlistTwoArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={`${styles.card}`}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={playlistThreeImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{playlistThree}</p>
                                    <p>{playlistThreeArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={`${styles.card}`}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={playlistFourImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{playlistFour}</p>
                                    <p>{playlistFourArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={`${styles.card}`}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={5}>
                                    <img src={playlistFiveImage} className={`${styles.album}`} />
                                </Grid>
                                <Grid container item xs={7} className={`${styles.column}`}>
                                    <p>{playlistFive}</p>
                                    <p>{playlistFiveArtist}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </div>
            </div>
        </>
    );
};

export default Main;