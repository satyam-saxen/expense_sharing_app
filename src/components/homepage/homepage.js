import { Nav, Navbar } from 'react-bootstrap';
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
            
            props.history.push('/login');
        }
        catch{
            alert("An unexpected error occured\n Request can't be processed now");
        }
    };
    return(
        <div className='header-container'>
            <Navbar collapseOnSelect variant="light" sticky='top' className="navbar">
                <h2 className="header-name">Expense Sharing App</h2>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link  onClick={logout}><b>Logout</b></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>);
}

export default Homepage;
