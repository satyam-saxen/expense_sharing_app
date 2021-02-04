import './expenseCard.css';

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ExpenseCard = ({expense})=>{
    return(
        <div className="row shadow-sm p-2 rounded expense-card">
            <div className="col-md-3">
                <figure>
                    <header>
                        {month[expense.dateTime.getMonth()]}
                    </header>
                    <section>
                        {expense.dateTime.getDate()}
                    </section>
                </figure>
            </div>  
            <div className="col-md-8">
                <div className="row">
                    <h5>{expense.description}</h5>
                </div>
                <div className="row">
                    <div className="col-md-9 expense-desc">
                        <p>Paid by-{expense.payerName}</p>
                    </div>
                    <div className="col-md-3">
                        <p>Rs{expense.amount}</p>
                    </div>
                </div>
            </div>  
        </div>
    )
};

export default ExpenseCard;
