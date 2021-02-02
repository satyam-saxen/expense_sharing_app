import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LogInResponse from './logInResponse';
import {useState} from 'react';

const API=({params}) => {
    let [response, setResponse] = useState(null);

    // console.log(params);
    useEffect(() => {
        const a = async() => {
            // const response = await handleFetch();
            const response = {
                status : 200
            };
            setResponse(response);
        };
        a();
    }, []);

    if(!response) {
        // console.log("checking");
        return null;
    }
    return (<LogInResponse response = {response}></LogInResponse>);
}

async function handleFetch() {
    try {
        let response = await axios.post(``);
        // console.log(response);
        return response;
    } catch (error) {
        return new Error();
    }
}

export default API;
