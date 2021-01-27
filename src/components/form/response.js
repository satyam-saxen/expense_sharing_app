import axios from 'axios';

export default async (setMessage, phone, password, setIsValid) => {
    
    try {
        const response = await axios.get("youtube.com",{
            phone:phone,
            password:password
        });
        console.log(response);
        setIsValid(true);
          
    } catch (e) {
        setIsValid(true);
        switch (e.response.status ) {

            case 200 : setMessage("Successfull Login");
            break;
            case 404 : setMessage("Bad Request");
            break;
            case 500 : setMessage("Serve error");
            break;
            default : setMessage("An Unknown Error Occured");
        }
        console.log(e.response.status);
    }
}