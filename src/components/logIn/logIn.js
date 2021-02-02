import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import {useState, useRef} from 'react';
import login from './../../services/userService';
import './../signUp/signUp.css';
import {Link} from 'react-router-dom';
import cookieHandler from '../HandleCookie/handleCookie';

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

    const handleLogin = (e)=>{
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
               login({phone,password})
               .then(response=>{
                setResponse(response);
                if(response.status === 200){
                  cookieHandler.setCookie('esaUserToken', response.data);
                  console.log(response.data);
                  props.history.push('/home');
                }else{
                   setStatus(true);
                   if(response.status === 401){
                      setErrorMsg("This phone number already exists, try logging in");
                   }else if(response.status === 404) {
                     setErrorMsg("Phone number does not exist");
                   }else{
                       console.log(response);
                     setErrorMsg(response.status);
                   }
                }
               }).catch(error =>{
                   console.log(error);
                   console.log(error.message);
                setStatus(true);
                 setErrorMsg(error.message);
               })

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
                <Link to = '/sign-up'>Don't have an account ?, Sign Up here</Link>
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
