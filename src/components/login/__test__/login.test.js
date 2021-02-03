import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import LogIn from './../login';

afterEach(cleanup);

describe("Form", () => {
    it("should render the basic fields", () => {
      render(<LogIn></LogIn>);
      expect(
        screen.getByRole("heading", { name: "Log In" })
      ).toBeInTheDocument();
      expect(
          screen.getByRole("spinbutton", { name: /phone/i })
        ).toBeInTheDocument();
  
      expect(
        screen.getByPlaceholderText(/Password/i)
      ).toBeInTheDocument();
   
      expect(screen.getByRole("button")).toBeInTheDocument();
  
    });
  });
  
  

describe("SignUp component",()=>{
    it('should check for the phone to be of digits', () => {
        const PhoneNumber = '8865011413';
        render(<LogIn></LogIn>)
        expect(screen.getByLabelText('Phone').value).toBe('') // empty before
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: PhoneNumber } })
        expect(screen.getByLabelText('Phone').value).toBe(PhoneNumber) //empty after 
    });

    it('should not allow letters to be inputted', () => {
        const randomString = 'Good Day';
        render(<LogIn></LogIn>)
        expect(screen.getByLabelText('Phone').value).toBe('') 
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: randomString } })
        expect(screen.getByLabelText('Phone').value).toBe('')    
    });

});
