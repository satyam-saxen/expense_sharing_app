import React from 'react';
import Form from '../form/form';
import Homepage from './../homepage/homepage';
const SignUpResponse  = ({response})=>{
    
    const status = response.status;

    if(status === 200 || status === 201){
        return(<Homepage></Homepage>);
    }else if(status === 400){
        alert("Incorrect Password");
        return(<Form></Form>);
    }else if(status === 409){
        alert("Someone already have this number please try with other Phone Number");
        return(<Form></Form>);
    }
    
}

export default SignUpResponse;