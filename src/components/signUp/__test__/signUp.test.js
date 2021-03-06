import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SignUp from './../SignUp';

afterEach(cleanup);

describe("Form", () => {
    it("should render the basic fields", () => {
      render(<SignUp></SignUp>);
      expect(
        screen.getByRole("heading", { name: "SignUp" })
      ).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  
      expect(
          screen.getByRole("spinbutton", { name: /phone/i })
        ).toBeInTheDocument();
  
      expect(
        screen.getByPlaceholderText(/Password/i)
      ).toBeInTheDocument();
  
      expect(
          screen.getByPlaceholderText(/Confirm/i)
        ).toBeInTheDocument();
      
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
  
  

describe("SignUp component",()=>{
    it("checks for the name field to have non zero length",()=>{
        const Name = 'Abhay';
        render(<SignUp></SignUp>);
        fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: Name },
        });
        expect(screen.getByLabelText('Name').value).toBe(Name);    
    });

    it('should check for the phone to be of digits', () => {
        const PhoneNumber = '8865011413';
        render(<SignUp></SignUp>)
        expect(screen.getByLabelText('Phone').value).toBe('') 
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: PhoneNumber } })
        expect(screen.getByLabelText('Phone').value).toBe(PhoneNumber) 
    });

    it('should not allow letters to be inputted', () => {
        const randomString = 'Good Day';
        render(<SignUp></SignUp>)
        expect(screen.getByLabelText('Phone').value).toBe('') 
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: randomString } })
        expect(screen.getByLabelText('Phone').value).toBe('') 
    });

    it("should check for the password not to be equal", () => {
        const pass = 123456;
        const conPass = 123436;
        render(<SignUp></SignUp>);
        fireEvent.input(screen.getByPlaceholderText(/Password/),{target:{ value:pass}});
        fireEvent.input(screen.getByPlaceholderText(/Confirm/),{target:{ value:conPass}});
        expect(screen.getByPlaceholderText(/Password/).value).not.toStrictEqual(screen.getByPlaceholderText(/Confirm/).value);
    });

    it("should check for the password to be equal", () => {
        const pass = 123456;
        const conPass = 123456;
        render(<SignUp></SignUp>);
        fireEvent.input(screen.getByPlaceholderText(/Password/),{target:{ value:pass}});
        fireEvent.input(screen.getByPlaceholderText(/Confirm/),{target:{ value:conPass}});
        expect(screen.getByPlaceholderText(/Password/).value).toStrictEqual(screen.getByPlaceholderText(/Confirm/).value);

    });
      test('Checks for toogle from sign up form to login form', () => {
        const {findByText} = render(<SignUp></SignUp>);
        const node = screen.getByText('Log In');
        fireEvent.click(node);
        expect(findByText(/Log In/)).toBeInTheDocument;
    });
});
