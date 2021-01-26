import React from 'react';
import Form from './../../form/form';
import { render,cleanup , screen,fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("SignUp component",()=>{
    it("checks for the name field to have non zero length",()=>{
        const Name = 'Abhay';
        
        render(<Form></Form>);
        fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: Name },
        });
        expect(screen.getByLabelText('Name').value).toBe(Name);
        
        
    });

    it('should check for the phone to be of digits', () => {

        const PhoneNumber = '8865011413';
        render(<Form></Form>)
        expect(screen.getByLabelText('Phone').value).toBe('') // empty before
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: PhoneNumber } })
        expect(screen.getByLabelText('Phone').value).toBe(PhoneNumber) //empty after
        
    });

    it('should not allow letters to be inputted', () => {
        const randomString = 'Good Day';
        render(<Form></Form>)
        expect(screen.getByLabelText('Phone').value).toBe('') // empty before
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: randomString } })
        expect(screen.getByLabelText('Phone').value).toBe('') //empty after
        
    });

    it("should check for the password not to be equal", () => {

        const pass = 12345;
        const conPass = 12343;

        render(<Form></Form>);

        fireEvent.input(screen.getByPlaceholderText(/Password/),{target:{ value:pass}});

        fireEvent.input(screen.getByPlaceholderText(/Confirm/),{target:{ value:conPass}});
        
        
        
        expect(screen.getByPlaceholderText(/Password/).value).not.toStrictEqual(screen.getByPlaceholderText(/Confirm/).value);
              
    });

    it("should check for the password to be equal", () => {

        const pass = 12345;
        const conPass = 12345;

        render(<Form></Form>);

        fireEvent.input(screen.getByPlaceholderText(/Password/),{target:{ value:pass}});

        fireEvent.input(screen.getByPlaceholderText(/Confirm/),{target:{ value:conPass}});
        
        
        
        expect(screen.getByPlaceholderText(/Password/).value).toStrictEqual(screen.getByPlaceholderText(/Confirm/).value);
              
    });

});