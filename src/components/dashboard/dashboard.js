import DebtCard from '../cards/debt/debtCard';
import ExpenseCard from '../cards/expense/expenseCard';
import handleCookie from './../handleCookie/handleCookie';
import startUpData from './../../services/dataService/dataService';
import Homepage from './../homepage/homepage';
import './dashboard.css';


const Dashboard = (props)=>{
    // let response = null;
    let response = {
        expenses:[
            {
                description:"Valentine Dinner",
                amount:"2000",
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
        ],
        user:"Satyam"
    };
    async function loadingData(token) {
        try {
            response = await startUpData({token});
            if(response.status === 200) {
                response = await response.json();
            }else if(response.status === 401) {
                alert("Session has been expired, login again!");
                props.history.push('/login');
            }
        }catch(e) {
            console.log(e.message);
            alert("Unexpected error occured please login again");
            props.history.push('/login');
        }
    }

    if(handleCookie.getCookie('esaUserToken')) {
        // loadingData(handleCookie.getCookie('esaUserToken')); //Uncomment this line while running server
    }

    if(response === null) {
        response = {
            expenses:[],
            debts:[]
        };
    }

    return(
        <>
        <Homepage props={props}></Homepage>
        <div className="dashboard-container">
            <div className="offset-md-2 col-md-8" >
                <div className="dashboard shadow p-3 mb-5 rounded">
                    <div className="row align-items-center nav shadow p-3">
                        <div className="col-md-4">
                            <h5>{response.user}'s Dashboard</h5>
                        </div>
                        <div className="offset-md-3 col-md-5 justify-item-end">
                            <button className="btn btn-primary add-expense-btn">Add an Expense</button>
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
                                {response.debts.map((debt)=>(
                                    <DebtCard debt={debt}></DebtCard>
                                ))}                            
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
                                {response.expenses.map((expense)=>(
                                        <ExpenseCard expense={expense}></ExpenseCard>
                                ))}                              
                                
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
