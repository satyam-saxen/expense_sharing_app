import * as React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import SignUp from '../../components/signUp/SignUp';
import { act } from 'react-dom/test-utils';
import register from './../userService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status:200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});
describe("Testing sign-up API",()=>{
    test('when the password don\'t match', async () => {

        const name="Shubham";
        const phone="8865126778";
        const password="123098";
        const confirm="123456";
      
        window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));
        
        
          const {findByText} = render(<SignUp></SignUp>);
      
          fireEvent.change(screen.getByLabelText('Name'), {
              target: { value: name },
              });
            
          fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });
          
          fireEvent.change(screen.getByPlaceholderText(/Password/),{target:{ value:password}});
          
          fireEvent.change(screen.getByPlaceholderText(/Confirm/),{target:{ value:confirm}});
          await act(async () => {
          fireEvent.click(screen.getByRole('button', {name: /Submit/i}))
          expect(window.fetch).toHaveBeenCalledTimes(0)
          const element = await findByText(/Password don't match/i);
          expect(element).toBeInTheDocument();
          });
      
      })

      test('when the phone number not of 10 digit', async () => {

        const name="Shubham";
        const phone="88651267";
        const password="123098";
        const confirm="123456";
      
        window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));
        
        
          const {findByText} = render(<SignUp></SignUp>);
      
          fireEvent.change(screen.getByLabelText('Name'), {
              target: { value: name },
              });
            
          fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });
          
          fireEvent.change(screen.getByPlaceholderText(/Password/),{target:{ value:password}});
          
          fireEvent.change(screen.getByPlaceholderText(/Confirm/),{target:{ value:confirm}});
          await act(async () => {
          fireEvent.click(screen.getByRole('button', {name: /Submit/i}))
          expect(window.fetch).toHaveBeenCalledTimes(0)
          const element = await findByText(/This is not a valid Phone/i);
          expect(element).toBeInTheDocument();
          });
      
      })

      test('when user data is correct', async () => {

        const name="Shubham";
        const phone="88651267";
        const password="123098";
      
        fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));
        
        const response = await register({name,phone,password});
        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/users", {"body": JSON.stringify({name,phoneNumber:phone,password}), "headers": {"Accept": "application/json, text/plain", 
            "Content-Type": "application/json"}, "method": "post"}
        )
        expect(response.status).toBe(400);
        
      
      })

     
});