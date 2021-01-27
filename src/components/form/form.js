import logIn from './../logIn/LogIn';
import {useState} from 'react';
import './form.css';

const Form = ()=>{
    let [phone,getPhone]=useState('');
    let [password,getPassword]=useState('');
    let [isValid,setIsValid] = useState(false);
    let params = {
        "phone":phone,
        "password":password
    };

    const validatePhoneAndPassword = (e)=>{
        e.preventDefault();
        if(phone.length !== 10 || password.length === 0){
            alert("Invalid Phone Number! or Password");
            return(<div></div>);
        } else{
            setIsValid(true);
        }        
    }

    return(
        <div>{!isValid && 
            <form data-toggle="validator"  onSubmit={validatePhoneAndPassword}>
                <LogIn params={params}></LogIn>
            </form>}
        </div>
    )
}

export default Form;