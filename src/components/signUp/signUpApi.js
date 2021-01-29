import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUpResponse from './signUpResponse';
import {useState,useEffect} from 'react';
import Config from './../../Config.json';

const API = ({params})=>{  
  let [response, setResponse] = useState(null);

  useEffect(() => {
    const a = async () => {
      let response = await handleFetch(params); 
      console.log("Is it working");
      console.log(response);
      console.log("In useEffect");
      setResponse(response);
    };

    a();
  }, []);

  if (!response) {
    return null;
  }
  return(<SignUpResponse response={response}></SignUpResponse>);
}

async function handleFetch({phone,password,name}){
  try {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const response = await axios.post(`${proxyurl}${Config.Config.url}/users`,{
        name:name,
        phoneNumber:phone,
        password:password
      });
      return response;
    } catch (error) {
      return new Error();
  }
}




export default API;