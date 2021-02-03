import Config from './../Config.json';

async function login({phone,password}){
    let response = () => {
      
    return new Promise(function(resolve, reject) {
        const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phoneNumber:phone,
            password: password
          }) 
        }
  
        fetch(`${Config.Config.url}/login`,
            options
        ).then(response => {  
          resolve(response);
        }).catch(error=>{
          reject(error);
        });
      });
    };
    let responseData = await response();
    return responseData;
  }
  
  export default login;