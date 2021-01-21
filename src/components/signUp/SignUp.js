const SignUp = (props)=>{
    return(
        <div>
            <h1>Expense Sharing App</h1>
            <Name name={props.params.name} setName={props.params.setName}></Name>
            <Phone phone={props.params.phone} setPhone={props.params.setPhone}></Phone>
            <Password password={props.params.password} confirmPassword={props.params.confirmPassword} setPassword={props.params.setPassword} setConfirmPassword={props.params.setConfirmPassword}></Password>
            <Button></Button>
            <a href="http://www.technogise.com"> Login Instead </a>
        </div>
    );
}

const Name = (props)=>{
    return(
        <div className="form-group">
            <label htmlFor="inputName" className="control-label">Name</label>
            <input type="text" className="form-control" id="inputName" required name='name' value={props.name}
              onChange={(e)=> props.setName(e.target.value)}/>
        </div>
    );
}

const Phone = (props)=>{
    return(
        <div className="form-group">
            <label htmlFor="phone" className="control-label">Phone</label>
            <input type="text" className="form-control" id="phone" required name='phone'
              value={props.phone} onChange={(e)=>props.setPhone(e.target.value)}/>
        </div>
    );
}

const Password = (props)=>{
    return(
        <div className="form-group">
            <label htmlFor="inputPassword" className="control-label" name='password'>Password</label>
                <input type="password" data-minlength="8" className="form-control" id="inputPassword" placeholder="Password" required name="password"
                  value={props.password} onChange={(e)=>props.setPassword(e.target.value)}/>
                <div className="help-block"></div>
            
            <label htmlFor="inputPassword" className="control-label" name='password'>Confirm Password</label>
                <input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="don't match" placeholder="Confirm" required
                 value={props.confirmPassword} onChange={(e)=>props.setConfirmPassword(e.target.value)}/>
                <div className="help-block with-errors"></div>
        </div>
    );
}

const Button = ()=>{
    return(
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    );
}
export default SignUp;