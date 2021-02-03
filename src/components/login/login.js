import { useRef, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import handleCookie from '../handleCookie/handleCookie';
import login from './../../services/userLoginService';
import './../signUp/signUp.css';

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
  
const LogIn = (props)=>{
    const form = useRef();
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState(false);
    const [response,setResponse] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');
    
      const onChangephone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

    async function handleLogin(e){
        e.preventDefault();

        setMessage("");
        setStatus(false);
        setSuccessful(false);

        form.current.validateAll();
        setMessage("");
        if(phone.length !== 10){
          setMessage("Phone number is not Valid");
        }else if(password.length<6 || password.length>40) {
          setMessage("Password must be between 6 and 40 characters");
        }else{             
          try{
            let response= await login({phone,password})
            if(response.status===200){
                let res = await response.text();
                setResponse(res);
                handleCookie.setCookie('esaUserToken',res);
                props.history.push('/home');
            }else{
              setStatus(true);
              if(response.status === 401){
                setErrorMsg("Incorrect Password entered");
              }else if(response.status === 404) {
                setErrorMsg("No user registered with this Phone Number");
              }else{
                setErrorMsg(response.status);
              }   
            }
          }
          catch(error){
            setStatus(true);  
            setErrorMsg(error.message);
          }
        }   
    }        

    return(
        <div className="container">
        <section id="content" >
            <Form onSubmit={handleLogin} ref={form}>
              {!successful && <div>
                <h1>Expense Sharing App</h1>
                <h3>Log In</h3>
                
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                    <h4>Do not have an account?</h4>
                    <a href="/sign-up">Sign Up</a>
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


export default LogIn;