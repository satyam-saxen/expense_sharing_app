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
        console.log("Hi everyone");
        console.log(response);
        resolve(response);
      });
    });
  };
  let responseData = await response();
  // const responseData = {
  //   status:200,
  //   message:"Phone Number already in use"
  // }
  return responseData;
}

export default register;