import Config from './../../Config.json';

async function startUpData({token}){
  let response = () => {
    
  return new Promise(function(resolve, reject) {
      const options = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':token
        } 
      };

      fetch(`${Config.Config.url}/aggregated-data`,
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

export default startUpData;

/*const response = {
        expenses:[
            {
                description:"Valentine Dinner",
                amount:"200",
                payerName:"Aaryam Saxena",
                dateTime:new Date()
            }
        ],
        debts:[
            {
                debtor:"Satyam Saxena",
                creditor:null,
                amount:"80"
            },
            {
                debtor:null,
                creditor:"Shubh",
                amount:"60"
            },
        ]
    }; */