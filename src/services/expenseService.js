import Config from './../Config.json';

async function addExpense({ token, description, amount, payerId, debtorIds }) {
  let response = () => {

    return new Promise(function (resolve, reject) {
      const options = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json',
          'authToken': token
        },
        body: JSON.stringify({
          description: description,
          amount: amount,
          payerId: payerId,
          debtorIds: debtorIds
        })
      }

      fetch(`${ Config.Config.url }/expenses`,
        options
      ).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };
  let responseData = await response();
  return responseData;
}

export default addExpense;
