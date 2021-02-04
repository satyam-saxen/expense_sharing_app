import './debtCard.css';

const DebtCard = ({debt})=>{
    return(
        <div className="row shadow-sm p-3 rounded debt-card">
            <div className="col-md-8 col-sm-8 col-8 card-item">
                <h6>{debt.debtor !== null ? debt.debtor : debt.creditor}</h6>
                <>{debt.debtor !== null ? <p className="debtor-desc">owes you</p> : <p className="creditor-desc">you owe</p>}</>
            </div>
            <div className="col-md-4 col-sm-4 col-4">
                <p><strong>{debt.amount}Rs.</strong></p>
            </div>
        </div> 
    )
};

export default DebtCard;