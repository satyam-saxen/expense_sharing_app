import './expenseCard.css';

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ExpenseCard = ({expense})=>{
    expense.dateTime = new Date(expense.dateTime);

		const deleteExpense = ()=> {
		  alert(`${expense.description} is going to be deleted!`);
		}

    return(
        <div className="row shadow-sm p-2 rounded expense-card">
            <div className="col-md-3 col-sm-3 col-3">
                <figure>
                    <header>
                        {month[expense.dateTime.getMonth()]}
                    </header>
                    <section>
                        {expense.dateTime.getDate()}
                    </section>
                </figure>
            </div>  
            <div className="col-md-7 col-sm-7 col-7">
                <div className="row">
                    <h5>{expense.description}</h5>
                </div>
                <div className="row">
                    <div className="col-md-9 col-sm-9 col-9 expense-desc">
                        <p>Paid by-{expense.payerName}</p>
                    </div>
                    <div className="col-md-3 col-sm-3 col-3">
                        <p>{'\u20B9'}{expense.amount}</p>
                    </div>
                </div>
            </div> 
						<div className="col-md-1 col-sm-1 col-1">
							<button className="fa fa-trash btn delete-expense-btn" onClick={deleteExpense}></button>
						</div> 
        </div>
    )
};

export default ExpenseCard;
