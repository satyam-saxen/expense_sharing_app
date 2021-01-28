import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './../homepage/homepage';

const LogInResponse = ({response}) => {

    const status = response.status;
    if(status === 200 || status === 201) {
        return (<Homepage></Homepage>);
    } else if(status === 400) {
        return <h1>Bad Resuest</h1>
    } else if(status === 409) {
        return (<h1>Number already Exists</h1>)
    } else if(status === 404) {
        return (<h1>Not Found!</h1>)
    }
}

export default LogInResponse; 