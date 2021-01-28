
import React from 'react';
import Form from './../../form/form';
import { render,cleanup , screen,fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("SignUp component",()=>{

    it('check for Phone number to be of 10 digits', () => {

        const PhoneNumber = '1234567891';
        render(<Form></Form>)
        expect(screen.getByLabelText('Phone').value).toBe("") // empty before
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
});
