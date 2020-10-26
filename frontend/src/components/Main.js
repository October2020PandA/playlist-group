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
        })
        .catch((err) => console.log(err))
    };

    useEffect(() => {set_csrfToken(getCsrfToken())}, )

    return(
        <>            
            <div>
                <div className="row">
                    <div className="col-7" />
                    <Paper elevation={7} className={`${styles.paper} col-4`}>
                        <p className={`${styles.header}`}>Go ahead and enter in a song...</p>
                        <form onSubmit={submitHandler}>
                            <input type="text" name="search_query" className={`${styles.songField} mb-3`} placeholder="Song..." onChange={(e) => setQuery(e.target.value)} ></input>
                            <button type="submit">Submit</button>
                        </form>
                        <p className={`${styles.header}`}>How should we make your playlist?</p>
                        <select name="playlistType" className={`mt-0 ${styles.selectField}`}>
                            <option value="BPM">BPM</option>
                            <option value="Tempo">Tempo</option>
                            <option value="Energy">Energy</option>
                        </select>
                    </Paper>
                </div>
            </div>
        </>
    );
};

export default Main;
