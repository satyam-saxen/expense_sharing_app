import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './../homepage/homepage';
const SignUpResponse  = ({response})=>{

    console.log(`Response in other file ${response.status}`);
    
    const status = response.status;

    if(status === 200 || status === 201){
        return(<Homepage></Homepage>);
    }else if(status === 400){
        return(<h1>Bad Request</h1>)
    }else if(status === 409){
        // window.alert("Phone number already exist");
        return(<h1>Number already exist</h1>);
    }
    
}

export default SignUpResponse;