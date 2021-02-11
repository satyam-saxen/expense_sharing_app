import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import SignUp from '../../components/signUp/SignUp';
import Config from './../../Config.json';
import register from './../userService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});
describe("Testing sign-up API", () => {
  test('when the password don\'t match', async () => {

    const name = "Shubham";
    const phone = "8865126778";
    const password = "123098";
    const confirm = "123456";

    window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));


    const { findByText } = render(<SignUp></SignUp>);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: name },
    });

    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });

    fireEvent.change(screen.getByPlaceholderText(/Password/), { target: { value: password } });

    fireEvent.change(screen.getByPlaceholderText(/Confirm/), { target: { value: confirm } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
      expect(window.fetch).toHaveBeenCalledTimes(0)
      const element = await findByText(/Passwords don't match/i);
      expect(element).toBeInTheDocument();
    });

  })

  test('when the phone number not of 10 digit', async () => {

    const name = "Shubham";
    const phone = "88651267";
    const password = "123098";
    const confirm = "123456";

    window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));


    const { findByText } = render(<SignUp></SignUp>);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: name },
    });

    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });

    fireEvent.change(screen.getByPlaceholderText(/Password/), { target: { value: password } });

    fireEvent.change(screen.getByPlaceholderText(/Confirm/), { target: { value: confirm } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
      expect(window.fetch).toHaveBeenCalledTimes(0)
      const element = await findByText(/Please enter a valid phone number/i);
      expect(element).toBeInTheDocument();
    });

  })

  test('when user data is correct', async () => {

    const name = "Shubham";
    const phone = "88651267";
    const password = "123098";

    fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));

    const response = await register({ name, phone, password });
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      Config.Config.url + "/users", {
        "body": JSON.stringify({ name, phoneNumber: phone, password }), "headers": {
          "Accept": "application/json, text/plain",
          "Content-Type": "application/json"
        }, "method": "post"
    }
    )
    expect(response.status).toBe(400);


  })


});
