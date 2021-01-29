import React from 'react';
import Homepage from './../homepage/homepage';
const SignUpResponse  = ({response})=>{
    
    const status = response.status;

    if(status === 200 || status === 201){
        return(<Homepage></Homepage>);
    }else if(status === 400){
        return(<h1>Bad Request</h1>)
    }else if(status === 409){
        return(<h1>Number already exist</h1>);
    }
    
}

export default SignUpResponse;