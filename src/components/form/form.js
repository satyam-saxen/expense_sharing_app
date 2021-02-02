import LogIn from './../logIn/LogIn.js';
import {useState} from 'react';
import userLogIn from '../logIn/userLogIn';
import LogInResponse from '../logIn/logInResponse.js';

const Form = ()=>{
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    let [isValid,setIsValid] = useState(false);  
    let [responseComponent,setResponseComponent] = useState(null);  
    let params = {
        "phone":phone,
        "setPhone":setPhone,
        "password":password,
        "setPassword":setPassword
    };

    const validatePhone = async (e)=>{
        e.preventDefault();
        if(phone.length!==10 || password.length<6)
        return alert('Invalid Phone or Password!');
       
            try {   
                const response = await userLogIn(phone,password);
                console.log(response);
                setResponseComponent(response);
                setIsValid(true);
            }
            catch(err) {
                // alert(err.message);
                LogInResponse(err.response);
                console.log(err.response.status);
            }        
    }
    return(
        <div>{!isValid && 
            <section id="content">
            <form data-toggle="validator"  onSubmit={validatePhone}>
                <LogIn params={params}></LogIn>
            </form></section>}
            {isValid && <div>{responseComponent}</div>} 
        </div>
    )
 }

export default Form;
