import React from 'react';
import cookieHandler from '../HandleCookie/handleCookie';
import Homepage from './../homepage/homepage';

const LogInResponse = (response) => {


    console.log(response.status);
    const status = response.status;
    if(status === 200) {
        cookieHandler.setCookie('esaUserToken', response.data);
        return <Homepage></Homepage>;
    } else if(status === 401) {

        return alert("Unauthorized");
    
    } else if(status === 404) {
        console.log("hello");
        return alert("No User Found!");
    }
    else return alert("Sorry! Check your Internet Connection");
}

export default LogInResponse; 