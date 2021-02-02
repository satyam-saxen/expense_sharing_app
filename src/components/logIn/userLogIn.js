import axios from 'axios';
import LogInResponse from './logInResponse';

export default async (phone,password)=>{

     const response = await axios.post('/login',
     {
          headers: {
               'Accept': 'application/json, text/plain',
               'Content-Type': 'application/json'
          },
          "phoneNumber":phone,
          "password":password
     });
     
     const userRedirect =  LogInResponse(response);
     console.log(userRedirect);
     return userRedirect;

}
