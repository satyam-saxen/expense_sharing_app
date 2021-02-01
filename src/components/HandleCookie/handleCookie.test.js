import handleCookie from "./handleCookie";

import Cookies from 'universal-cookie';
const Cookie = new Cookies();

it('checks the storage of cookie after setting one', () => {

    handleCookie.setCookie('esaUserToken', "User Looged In");
    expect(handleCookie.getCookie('esaUserToken')).toBe("User Looged In");
  
})

  it('checks whether a cookie is deleted successfully after delete command', () => {

    handleCookie.setCookie('esaUserToken', "User Looged In");
    handleCookie.deleteCookie('esaUserToken');
    expect(handleCookie.getCookie('esaUserToken')).toBe(undefined);

})

  it('checks if a cookie is present without setting one', () => {

    expect(handleCookie.getCookie('esaUserToken')).toBe(undefined);

})
