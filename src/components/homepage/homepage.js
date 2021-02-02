import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import './homepage.css';

const Homepage = (props)=>{
    function logout(event) {
        event.preventDefault();
        const cookie = new Cookies();
        try{
            if(cookie.get('esaUserToken')==null)
                alert("Already logged out");
            else
                cookie.remove('esaUserToken');
            
            props.history.push('/sign-up');
        }
        catch{
            alert("An unexpected error occured\n Request can't be processed now");
        }
    };
    return(
        <div className='contain'>
            <Button className = "logout-button" variant="primary" onClick={logout}>
                Logout
            </Button>
        </div>);
}

export default Homepage;