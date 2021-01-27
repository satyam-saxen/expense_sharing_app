import LogIn from './../logIn/LogIn';
import {useState} from 'react';
import response from './response';

const Form = ()=>{
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    let [isValid,setIsValid] = useState(false);
    let [message, setMessage] = useState('');
    let params = {
        "phone":phone,
        "setPhone":setPhone,
        "password":password,
        "setPassword":setPassword,
    };

    const validatePhone = async (e)=>{
        e.preventDefault();
        if(phone.length !== 10){
            alert("Invalid Phone Number! or Password!");
            return(<div></div>);
        } else{
            
            response(setMessage, phone, password, setIsValid);

        }        
    }

    return(
        <div>{!isValid && 
            <form data-toggle="validator"  onSubmit={validatePhone}>
                <LogIn params={params}></LogIn>
                {/* console.log("I am on") */}
            </form>}
            {isValid && 
                <div>{message}</div>
            }
        </div>
    )
}

export default Form;