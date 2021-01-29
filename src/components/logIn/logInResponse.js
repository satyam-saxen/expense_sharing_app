import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './../homepage/homepage';

const LogInResponse = ({response}) => {

    const status = response.status;
    if(status === 200) {
        return (<Homepage></Homepage>);
    } else if(status === 401) {
        return <h1>Unauthorized</h1>
    } else if(status === 404) {
        return (<h1>Not Found!</h1>)
    }
}

export default LogInResponse; 