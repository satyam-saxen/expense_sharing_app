const SignUp = ()=>{
    return(
        <div>
            <h1>Expense Sharing App</h1>
            <Name></Name>
            <Phone></Phone>
            <Password></Password>
            <Button></Button>
            <a href="/login"> Login Instead </a>
        </div>
    );
}

const Name = ()=>{
    return(
        <div className="form-group">
            <label for="inputName" className="control-label">Name</label>
            <input type="text" className="form-control" id="inputName" required name='name'/>
        </div>
    );
}

const Phone = ()=>{
    return(
        <div className="form-group">
            <label for="phone" className="control-label">Phone</label>
            <input type="text" className="form-control" id="phone" required name='phone'/>
        </div>
    );
}

const Password = ()=>{
    return(
        <div className="form-group">
            <label for="inputPassword" className="control-label" name='password'>Password</label>
                <input type="password" data-minlength="8" className="form-control" id="inputPassword" placeholder="Password" required name="password"/>
                <div className="help-block"></div>
            
            <label for="inputPassword" className="control-label" name='password'>Confirm Password</label>
                <input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="Whoops, these don't match" placeholder="Confirm" required/>
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