import LogIn from './../logIn/LogIn';
import {useState} from 'react';
import API from './../logIn/logInApi';

const Form = ()=>{
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    let [isValid,setIsValid] = useState(false);     
    let params = {
        "phone":phone,
        "setPhone":setPhone,
        "password":password,
        "setPassword":setPassword
    };

    const validatePhone = async (e)=>{
        e.preventDefault();
        if(phone.length !== 10){
            alert("Invalid Phone Number! or Password!");
            return(<div></div>);
        } else{
            
            setIsValid(true);

        }        
    }

    return(
        <div>{!isValid && 
            <form data-toggle="validator"  onSubmit={validatePhone}>
                <LogIn params={params}></LogIn>
            </form>}
            {isValid && <API params={params}></API>} 
        </div>
    )
 }

export default Form;