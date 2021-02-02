import './dashboard.css';

const Dashboard = ()=>{
    return(
        <div className="dashboard-container">
            <div className="offset-md-2 col-md-8" >
                <div className="dashboard shadow p-3 mb-5 rounded">
                    <div className="row align-items-center nav shadow p-3">
                        <div className="col-md-4">
                            <h2>Dashboard</h2>
                        </div>
                        <div className="offset-md-3 col-md-5 justify-item-end">
                            <button class="btn btn-primary add-expense-btn">Add an Expense</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 p-3 shadow">
                            <div className="row shadow-lg p-3 mb-5 rounded">
                                <div className="col-md-4">
                                    <h5>Debt List</h5>
                                </div>
                                <div className="col-md-8">

                                </div>
                            </div>
                            <div className="row">
                                <p>yrquwysd sfshs dhfs ifhskdjskfdjksdfjsd sjkdjsk dsjdklaksjdaidjliwjdaijaskdla maskdks a dnsaksd ad 
                                    dkajkjadk akjdkajsdi sajdaij wi w asjdaldj wli da dsjdiad adjakd l adhfweiwjo f scn irejaifjdkanjfnakalnk 
                                    ksmkdfksjfkdsjfksdjkdkan akj jaidji wijd a
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 p-3 shadow">
                            <div className="row shadow-lg p-3 mb-5 rounded">
                                <div className="col-md-5">
                                    <h5>Expense List</h5>
                                </div>
                                <div className="col-md-7">

                                </div>
                            </div>
                            <div className="row">
                                <p>yrquwysd sfshs dhfs ifhskdjskfdjksdfjsd sjkdjsk dsjdklaksjdaidjliwjdaijaskdla maskdks a dnsaksd ad 
                                    dkajkjadk akjdkajsdi sajdaij wi w asjdaldj wli da dsjdiad adjakd l adhfweiwjo f scn irejaifjdkanjfnakalnk 
                                    ksmkdfksjfkdsjfksdjkdkan akj jaidji wijd a
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
