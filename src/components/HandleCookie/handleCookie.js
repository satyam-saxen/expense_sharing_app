import Cookies from 'universal-cookie';
const cookie = new Cookies();

const getCookie = (key)=>{
    return cookie.get(key);
     
}

const setCookie = (key,value)=>{
    
    cookie.set(key,value,{path:'/'});

}
const deleteCookie = (key)=>{
        cookie.remove(key);
}

export default {
    getCookie,
    setCookie,
    deleteCookie
}
