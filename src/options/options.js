import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { sendToBackground } from '../utils/helpers';
import { SAVE_TO_STORAGE } from '../utils/constants';

const Options = () => {
    const [results, setResults] = useState({});
    
    console.log('results', results)

    const handleOnClick = async () => {
        await browser.storage.local.clear();
        browser.storage.local.set(results);
        sendToBackground(SAVE_TO_STORAGE, results);
    }

    const exportToJsonFile1 = async () => {
        let dataStr = JSON.stringify(await browser.storage.local.get());
        let url = URL.createObjectURL(new Blob([dataStr], { type: "application/json" }));
        const downloadId = await browser.downloads.download({
            url: url,
            filename: "storage.json",
            saveAs: true
          });
        
    }

    const handleOnChange = async (event) => {
        let file = await event.target.files[0];    
        let reader = new FileReader();

        reader.onload = e => setResults(JSON.parse(e.target.result));
        
        reader.readAsText(file);
    } 

    return (
        <>
            <h1>Import</h1>
            <input type="file" id="import-file" onChange={handleOnChange} />
            <button id="import-button" onClick={handleOnClick} >Import Local Storage</button>
            <h1>Export</h1>
            <button id="export-button" onClick={exportToJsonFile1} >Export Local Storage</button>
        </>
    );
};

export default Options;
