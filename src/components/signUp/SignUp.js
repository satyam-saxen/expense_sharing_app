import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import {useState, useRef} from 'react';
import register from './../../services/userService';
import './signUp.css';

const validPhone = (value) => {
    if (value.length !== 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter a valid phone number
        </div>
      );
    }
  };

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
const SignUp = (props)=>{
    const form = useRef();
    let [name,setName]=useState('');
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    let [confirmPassword,setConfirmPassword]=useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState(false);
    const [response,setResponse] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');

      const onChangeUsername = (e) => {
        const username = e.target.value;
        setName(username);
      };
    
      const onChangephone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };
    
      const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
      };


    const handleRegister = (e)=>{
        e.preventDefault();

        setMessage("");
        setStatus(false);
        setSuccessful(false);

        form.current.validateAll();
          setMessage("");
          if(phone.length !== 10){
            setMessage("Phone number is not Valid");
          }else if(password !== confirmPassword || password.length<6){
          setMessage("Passwords don't match");
          if(phone.length !== 10){
            setMessage("Phone number is not Valid");
          }
          if(password.length<6 || password.length>40) {
            setMessage("Password must be between 6 and 40 characters");
          }
          }else{             
               register({name,phone,password})
               .then(response=>{
                setResponse(response);
                if(response.status === 201){
                  props.history.push('/home');
                }else{
                   setStatus(true);
                   if(response.status === 409){
                      setErrorMsg("This phone number already exists, try logging in");
                   }else if(response.status === 400) {
                     setErrorMsg("Data Incorrect");
                   }else{
                     setErrorMsg(response);
                   }
                }
               }).catch(error =>{
                 setErrorMsg(error);
               })

        }        
    }

    return(
        <div className="container">
        <section id="content" >
            <Form onSubmit={handleRegister} ref={form}>
              {!successful && <div>
                <h1>Expense Sharing App</h1>
                <h3>SignUp</h3>
                <div className="form-group">
                    <label htmlFor="inputName" className="control-label">Name</label>
                    <Input type="text" className="form-control" id="inputName" required={true} placeholder="Name" name='name' value={name}
                    onChange={onChangeUsername}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="control-label">Phone</label>
                    <Input type="number" className="form-control" id="phone" required={true} name='phone'
                        placeholder="10 digit Phone Number"
                    value={phone} onChange={onChangephone} validations={[validPhone]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="control-label" name='password'>Password</label>
                        <Input type="password" data-minlength={8} className="form-control" id="inputPassword" placeholder="Password" required={true} name="password"
                        value={password} onChange={onChangePassword} validations={[vpassword]}/>
                        
                    
                    <label htmlFor="inputPassword" className="control-label" name='password'>Confirm Password</label>
                        <Input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="don't match" placeholder="Confirm" required={true}
                        value={confirmPassword} onChange={onChangeConfirmPassword} validations={[vpassword]}/>
                        
                </div>
                
                {message && 
                  <div className="form-group">
                    <div
                      className={ successful ? "alert alert-success" : "alert alert-danger" }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                }
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <a href="http://www.technogise.com"> Login Instead </a>
                </div> }
                {status && 
                  <div className="form-group">
                    <div
                      className={ successful ? "alert alert-success" : "alert alert-danger" }
                      role="alert"
                    >
                      {errorMsg}
                    </div>
                  </div>
                }
            </Form>
        </section>
    </div>
    );
}


export default SignUp;
