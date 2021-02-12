import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import LogIn from '../../components/login/login';
import Config from './../../Config.json';
import login from './../userLoginService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});
describe("Testing sign-up API", () => {

  test('when the phone number not of 10 digit', async () => {
    const phone = "88651267";
    const password = "123098";

    window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));
    const { findByText } = render(<LogIn></LogIn>);
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });
    fireEvent.change(screen.getByPlaceholderText(/Password/), { target: { value: password } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }))
      expect(window.fetch).toHaveBeenCalledTimes(0)
      const element = await findByText(/Please enter a valid phone number/i);
      expect(element).toBeInTheDocument();
    });
  });

  test('when the password is less than 6 characters', async () => {

    const phone = "88651267";
    const password = "12309";

    window.fetch.mockResolvedValueOnce(() => Promise.resolve({ status: 400 }));
    const { findByText } = render(<LogIn></LogIn>);
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: phone } });
    fireEvent.change(screen.getByPlaceholderText(/Password/), { target: { value: password } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }))
      expect(window.fetch).toHaveBeenCalledTimes(0)
      const element = await findByText(/The password must be between 6 and 40 characters/i);
      expect(element).toBeInTheDocument();
    });
  });

  test('when user data is correct', async () => {
    const phone = "8865126787";
    const password = "123098";
    fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));
    const response = await login({ phone, password });
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      Config.Config.url + "/login", {
        "body": JSON.stringify({ phoneNumber: phone, password }),
      "headers": { "Content-Type": "application/json" }, "method": "post"
    }
    )
    expect(response.status).toBe(400);
  })

  test('when user data is incorrect', async () => {
    const phone = "8865126776";
    const password = "123098";
    let error;
    fetch.mockImplementationOnce(() => Promise.reject({ status: 500 }));
    try {
      const response = await login({ phone, password });
    }
    catch (e) {
      error = e;
    }
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      Config.Config.url + "/login", {
        "body": JSON.stringify({ phoneNumber: phone, password }),
      "headers": { "Content-Type": "application/json" }, "method": "post"
    }
    )
    expect(error.status).toBe(500);
  })
});
