import addExpense from './../../../services/expenseService';
import handleCookie from './../../handleCookie/handleCookie';
import './debtCard.css';

const DebtCard = (props) => {
  async function handleSettle(e) {
    let userAction = window.confirm("Are you sure, You want to settle this debt?");
    console.log(userAction);
    if(userAction === true) {
      e.preventDefault();
      let token = handleCookie.getCookie('esaUserToken');
      let description = "Settlement";
      let amount = props.debt.amount;
      let payerId = null;
      let debtorIds = [];

      if (props.debt.creditor !== null) {
        const debtor = props.otherUsers.find(item => item.name === props.debt.creditor);
        debtorIds.push(debtor.id);
      } else {
        debtorIds.push(props.user.id);
      }

      if (props.debt.debtor !== null) {
        const payer = props.otherUsers.find(item => item.name === props.debt.debtor);
        payerId = payer.id;
      } else {
        payerId = props.user.id;
      }

      try {
        let response = await addExpense({ token, description, amount, payerId, debtorIds });
        if (response.status === 200) {
          let res = await response.json();
          props.setRes(res);
          props.setResState();
        } else {
          if (response.status === 401) {
            alert("The debt settlement was not successful \n Please login again")
            props.history.push('/login');
          } else {
            alert("The debt settlement was not successful");
          }
        }
      }
      catch (error) {
        alert("The debt settlement was not successful \n Some unexpected error occured");
      }
    }
  }

  return (
    <div className="row shadow-sm p-3 rounded debt-card">
      <div className="col-md-4 col-sm-4 col-4 card-item">
        <h6>{props.debt.debtor !== null ? props.debt.debtor : props.debt.creditor}</h6>
        <>{props.debt.debtor !== null ? <p className="debtor-desc">owes you</p> : <p className="creditor-desc">you owe</p>}</>
      </div>
      <div className="col-md-4 col-sm-4 col-4">
        <p><strong>{'\u20B9'}{Math.round((props.debt.amount + Number.EPSILON) * 100) / 100}</strong></p>
      </div>
      <div className="btn-container col-md-4 col-sm-4 col-4">
        <button
          className="settle-debt"
          onClick={handleSettle}>
          Settle
        </button>
      </div>
    </div>
  )
};

export default DebtCard;
