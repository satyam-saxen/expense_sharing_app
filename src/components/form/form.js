import SignUp from './../signUp/SignUp';
import {useState} from 'react';
import API from './../signUp/signUpApi';

const Form = ()=>{
    let [name,setName]=useState('');
    let [phone,setPhone]=useState('');
    let [password,setPassword]=useState('');
    let [confirmPassword,setConfirmPassword]=useState('');
    let [isValid,setIsValid] = useState(false);
    let params = {
        "name":name,
        "setName":setName,
        "phone":phone,
        "setPhone":setPhone,
        "password":password,
        "setPassword":setPassword,
        "confirmPassword":confirmPassword,
        "setConfirmPassword":setConfirmPassword
    };

    const validatePhone = (e)=>{
        e.preventDefault();
        if(phone.length !== 10 || password !== confirmPassword){
            alert("Invalid Phone or password mismatch!");
            return(<div></div>);
        }else{
            console.log("Checking...");
            setIsValid(true);
        }        
    }

    return(
        <div>{!isValid && 
            <form data-toggle="validator"  onSubmit={validatePhone}>
                <SignUp params={params}></SignUp>
            </form>}
            {isValid && <API params={params}></API>}
        </div>
    )
}



export default Form;