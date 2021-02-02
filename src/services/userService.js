import Config from './../Config.json';

async function register({phone,password,name}){
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
      }).catch(error=>{
        reject(error);
      });
    });
  };
  let responseData = await response();
  return responseData;
}

export default register;
