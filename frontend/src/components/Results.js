import React from 'react';
import { Paper, Button } from '@material-ui/core';
import styles from '../modules/Main.module.css';

const Results = () => {
    return(
        <>
                <Paper elevation={3} className={`${styles.paper} col-4`}>
                    {/* <input type="text" className="mb-3" placeholder="(Enter a song)"></input> */}
                    <p>How do you want to create your playlist?</p>

                    <select name="playlistType" className={`mt-0`}>
                        <option value="BPM">BPM</option>
                        <option value="Tempo">Tempo</option>
                        <option value="Energy">Energy</option>
                    </select>
                </Paper>
        </>
    );
};

export default Results;