import React from 'react';
import Homepage from './../homepage/homepage';
import cookieHandler from './../HandleCookie/handleCookie';
import {Switch, Route } from 'react-router-dom';

const LogInResponse = ({response}) => {

    const status = response.status;
    if(status === 200) {
        cookieHandler.setCookie('esaUserToken',response.authToken);
        console.log(cookieHandler.getCookie('esaUserToken'));
        // console.log(cookieHandler.deleteCookie('esaUserToken'));
        return (<Homepage></Homepage>);
    } else if(status === 401) {
        return <h1>Unauthorized</h1>
    } else if(status === 404) {
        return (<h1>Not Found!</h1>)
    }
}

export default LogInResponse; 