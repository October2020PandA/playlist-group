import React, {useEffect, useState} from 'react';
import { Paper } from '@material-ui/core';
import styles from '../modules/Main.module.css';
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true

const Main = () => {
    const [query, setQuery] = useState("")
    const [errs, setErrs] = useState("")
    const [_csrfToken, set_csrfToken] = useState(null);
    const [songOne, setSongOne] = useState();
    const [songTwo, setSongTwo] = useState();
    const [songThree, setSongThree] = useState();
    const [songFour, setSongFour] = useState();
    const [songFive, setSongFive] = useState();
    const [songOneUri, setSongOneUri] = useState();
    const [songTwoUri, setSongTwoUri] = useState();
    const [songThreeUri, setSongThreeUri] = useState();
    const [songFourUri, setSongFourUri] = useState();
    const [songFiveUri, setSongFiveUri] = useState();
    const [playlist, setPlaylist] = useState();
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
                setSongTwo(songInitial.data.response.list_songs.tracks.items[1].name)
                setSongThree(songInitial.data.response.list_songs.tracks.items[2].name)
                setSongFour(songInitial.data.response.list_songs.tracks.items[3].name)
                setSongFive(songInitial.data.response.list_songs.tracks.items[4].name)
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
    const selectHandler = (e) => {
        e.preventDefault()
        axios({
                method: 'POST',
                url: `${API_HOST}/selected_song`,
                data: {
                    // withCredentials: true,
                    selected_track: {songOneUri}
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': _csrfToken,
                }
            }
        )
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {set_csrfToken(getCsrfToken())}, )
    console.log(songOneUri)

    return(
        <>
            <div>
                <div className="row d-flex justify-content-around">
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <p className={`${styles.header}`}>Go ahead and enter in a song...</p>
                        <form onSubmit={submitHandler}>
                            <input type="text" name="search_query" className={`${styles.songField} mb-3`} placeholder="Song..." onChange={onChangeHandler} ></input>
                            <button type="submit">Submit</button>
                        </form>
                        <p className={`${styles.header}`}>How should we make your playlist?</p>
                        <select name="playlistType" className={`mt-0 ${styles.selectField}`}>
                            <option value="BPM">BPM</option>
                            <option value="Tempo">Tempo</option>
                            <option value="Energy">Energy</option>
                        </select>
                    </Paper>
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <p name='selected_track' id="selected_track" onClick={selectHandler}>{songOne}</p>
                        <p>{songTwo}</p>
                        <p>{songThree}</p>
                        <p>{songFour}</p>
                        <p>{songFive}</p>
                    </Paper>
                    <Paper elevation={7} className={`${styles.paper} col-3`}>
                        <p>Hello World</p>
                    </Paper>
                </div>
            </div>
        </>
    );
};

export default Main;