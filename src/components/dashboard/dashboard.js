import './dashboard.css';

const Dashboard = ()=>{
    return(
        <div className="dashboard-container">
            <div className="offset-md-2 col-md-8" >
                <div className="dashboard shadow p-3 mb-5 rounded">
                    <div className="row align-items-center nav shadow p-3">
                        <div className="col-md-4">
                            <h4>Dashboard</h4>
                        </div>
                        <div className="offset-md-3 col-md-5 justify-item-end">
                            <button class="btn btn-primary add-expense-btn">Add an Expense</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 p-3 shadow">
                            <div className="row shadow-lg p-3 rounded">
                                <div className="col-md-4">
                                    <h5>Debts</h5>
                                </div>
                                <div className="col-md-8">

                                </div>
                            </div>
                            <div className="card-container">                                
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    <div className="col-md-9 card-item">
                                        <h6>Satyam Saxena</h6>
                                        <p>owes you</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>$75.0</strong></p>
                                    </div>
                                </div>
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    <div className="col-md-9 card-item">
                                        <h6>Satyam Saxena</h6>
                                        <p>owes you</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>$75.0</strong></p>
                                    </div>
                                </div>
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    <div className="col-md-9 card-item">
                                        <h6>Satyam Saxena</h6>
                                        <p>owes you</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>$75.0</strong></p>
                                    </div>
                                </div>
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    <div className="col-md-9 card-item">
                                        <h6>Satyam Saxena</h6>
                                        <p>owes you</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>$75.0</strong></p>
                                    </div>
                                </div>
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    <div className="col-md-9 card-item">
                                        <h6>Satyam Saxena</h6>
                                        <p>owes you</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>$75.0</strong></p>
                                    </div>
                                </div>
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
                                <div className="row shadow-sm p-3 rounded debt-card">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
