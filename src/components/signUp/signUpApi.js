import React, { useEffect, useState } from 'react';
import Config from './../../Config.json';
import SignUpResponse from './signUpResponse';

const API = ({params})=>{  
  let [response, setResponse] = useState(null);

  useEffect(() => {
    const a = async () => {
      let response = await handleFetch(params); 
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
  let response = () => {
    
  return new Promise(function(resolve, reject) {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phoneNumber:phone,
          password: password,
        }) 
      }

      fetch(`${Config.Config.url}/users`,
          options
      ).then(response => {
        resolve(response);
      });
    });
  };
  let responseData = await response();
  return responseData;
}

export default API;