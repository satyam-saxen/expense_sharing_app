
const LogIn=(props) => {
    return (
        <div>
            <h1>Expense Sharing App</h1>
            <h2>Log In</h2>
            <Phone phone={props.params.phone} setPhone={props.params.setPhone}></Phone>
            <Password password={props.params.password} setPassword={props.params.setPassword}></Password>
            <Button id="signInButton"></Button>
            <h5>_______</h5>
            <a id="register" href="http://www.technogise.com"> Register Here </a>
        </div>
    );
}


const Phone = (props)=>{
    return(
        <div className="form-group">
            <label id="phoneText" htmlFor="phoneBox" className="control-label">Phone</label>
            <input type="number" className="form-control" id="phoneBox" required={true} name='phone'
                pattern="\d{10}" placeholder="10 digit Phone Number"
              value={props.phone} onChange={(e)=>props.setPhone(e.target.value)}/>
        </div>
    );
}


const Password = (props)=>{
    return(
        <div className="form-group">
            <label id="pass" htmlFor="inputPassword" className="control-label" name='password'>Password</label>
                <input type="password" data-minlength={8} className="form-control" id="inputPassword" placeholder="Password" required={true} name="password"
                  value={props.password} onChange={(e)=>props.setPassword(e.target.value)}/>
                <div className="help-block"></div>
        </div>
    );
}


const Button = ()=>{
    return(
        <div className="form-group">
            <button type="submit" className="btn btn-primary" id="signButton">Sign In</button>
        </div>
    );
}
export default LogIn;