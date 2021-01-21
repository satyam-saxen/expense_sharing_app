import SignUp from './../signUp/SignUp';

const Form = ()=>{
    return(
        <div>
            <form data-toggle="validator"  method="POST" action="/register">
                <SignUp></SignUp>
            </form>
        </div>
    )
}



export default Form;