
function LogIn(props) {
    return (
        <div>
            <h1>Expense Sharing App</h1>
            <h3>Log In</h3>
            <Phone phone={props.params.phone} setPhone={props.params.setPhone}></Phone>
            <Password password={props.params.password} setPassword={props.params.setPassword}></Password>
            <Button></Button>
            <h5>Do not have an account yet ?</h5>
            <a href="http://www.technogise.com"> Register Here </a>
        </div>
    );
}


const Phone = (props)=>{
    return(
        <div className="form-group">
            <label htmlFor="phone" className="control-label">Phone</label>
            <input type="number" className="form-control" id="phone" required={true} name='phone'
                pattern="\d{10}" placeholder="10 digit Phone Number"
              value={props.phone} onChange={(e)=>props.setPhone(e.target.value)}/>
        </div>
    );
}


const Password = (props)=>{
    return(
        <div className="form-group">
            <label htmlFor="inputPassword" className="control-label" name='password'>Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" required={true} name="password"
                  value={props.password} onChange={(e)=>props.setPassword(e.target.value)}/>
        </div>
    );
}


const Button = ()=>{
    return(
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
    );
}
export default LogIn;