import { useEffect, useState } from 'react';
import DebtCard from '../cards/debt/debtCard';
import ExpenseCard from '../cards/expense/expenseCard';
import startUpData from './../../services/dataService/dataService';
import AddExpenseForm from './../expense/modal';
import handleCookie from './../handleCookie/handleCookie';
import Homepage from './../homepage/homepage';
import './dashboard.css';


const Dashboard = (props) => {
  let [resp, setResp] = useState(null);
  const [show, setShow] = useState(false);
  const [expenseResponse, setExpenseResponse] = useState(null);
  const [expenseUpdated, setExpenseUpdated] = useState(false);
  let close = (val) => { setShow(val); }
  let setRes = (res) => { setExpenseResponse(res); }
  let setResState = () => { setExpenseUpdated(true); }

  useEffect(() => {
    async function loadingData(token) {
      try {
        let response = await startUpData({ token });
        if (response.status === 200) {
          setResp(await response.json());

        } else if (response.status === 401) {
          alert("Session has been expired, login again!");
          props.history.push('/login');
        }
      } catch (e) {
        console.log(e.message);
        alert("Unexpected error occured please login again");
        props.history.push('/login');
      }
    }

    if (handleCookie.getCookie('esaUserToken')) {
      loadingData(handleCookie.getCookie('esaUserToken'));
    }
  }, []);


  return (
    <>
      <Homepage props={props}></Homepage>
      <div className="dashboard-container">
        <div className="offset-md-2 col-md-8" >
          <div className="dashboard shadow p-3 mb-5 rounded">
            <div className="row align-items-center nav shadow p-3">
              <div className="col-md-4">
                <h5>{resp !== null ? resp.user.name : ""} Dashboard</h5>
              </div>
              <div className="offset-md-3 col-md-5 justify-item-end">
                <button
                  onClick={() => setShow(true)}
                  className="add-expense-btn">Add an Expense</button>
                <AddExpenseForm
                  show={show}
                  setRes={setRes}
                  setResState={setResState}
                  onHide={close}
                  user={resp !== null ? resp.user : null}
                  otherUsers={resp !== null ? resp.otherUsers : null}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 p-3 shadow">
                <div className="row shadow-lg p-3 rounded">
                  <div className="col-md-4 col-sm-6">
                    <h5>Debts</h5>
                  </div>
                  <div className="col-md-8 col-sm-6">

                  </div>
                </div>
                <div className="card-container">
                  {expenseUpdated === true ?
                    (expenseResponse !== null ? expenseResponse.debts.map((debt) => (
                      <DebtCard debt={debt}></DebtCard>
                    )) : null) :
                    (resp !== null ? resp.debts.map((debt) => (
                      <DebtCard debt={debt}></DebtCard>
                    )) : null)}
                </div>
              </div>
              <div className="col-md-6 p-3 shadow">
                <div className="row shadow-lg p-3 rounded">
                  <div className="col-md-5">
                    <h5>Expenses</h5>
                  </div>
                  <div className="col-md-7">

                  </div>
                </div>
                <div className="card-container">
                  {expenseUpdated === true ?
                    (expenseResponse !== null ? expenseResponse.expenses.map((expense) => (
                      <ExpenseCard expense={expense}></ExpenseCard>
                    )) : null) :
                    (resp !== null ? resp.expenses.map((expense) => (
                      <ExpenseCard expense={expense}></ExpenseCard>
                    )) : null)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;