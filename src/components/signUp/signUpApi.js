import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUpResponse from './signUpResponse';
import {useState,useEffect} from 'react';

const API = ({params})=>{  
  let [response, setResponse] = useState(null);
  
  console.log(params);
  useEffect(() => {
    const a = async () => {
      // const response = await handleFetch();   //This line should be present while running the code
      const response = { // this is just for running code without signup api
        status: 200
      };
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

async function handleFetch(){
  try {
      let response = await axios.post(``);
      console.log(response);
      return response;
    } catch (error) {
      return new Error();
  }
}




export default API;