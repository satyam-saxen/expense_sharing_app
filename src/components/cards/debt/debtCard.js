import './debtCard.css';

const DebtCard = ({debt})=>{
    return(
        <div className="row shadow-sm p-3 rounded debt-card">
            <div className="col-md-8 card-item">
                <h6>{debt.debtor !== null ? debt.debtor : debt.creditor}</h6>
                <p>{debt.debtor !== null ? <p className="debtor-desc">owes you</p> : <p className="creditor-desc">you owe</p>}</p>
            </div>
            <div className="col-md-4">
                <p><strong>{debt.amount}Rs.</strong></p>
            </div>
        </div> 
    )
};

export default DebtCard;