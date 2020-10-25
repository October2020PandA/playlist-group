import React, {useState} from 'react';
import { Paper, Button } from '@material-ui/core';
import styles from '../modules/Main.module.css';
import axios from 'axios';

const Main = () => {
    const [song, setSong] = useState("")
    const [errs, setErrs] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("hello world")
        axios
            .post("http://127.0.0.1:8000/search", {song})
            .then((res) => {
                if (res.data.errors) {
                    setErrs(res.data.errors)
                } /*else {
                    navigate("/items/" + res.data._id)
                }*/
            })
            .catch((err) => console.log(err))
    };

    return(
        <div>
            <div class="row">
                <div class="col-7" />
                <Paper elevation={7} className={`${styles.paper} col-4`}>
                    <p className={`${styles.header}`}>Go ahead and enter in a song...</p>
                    <form onSubmit={submitHandler}>
                        <input type="text" className="mb-3" placeholder="Song..." className={`${styles.songField}`}></input>
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
    );
};

export default Main;