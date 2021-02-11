import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import AddExpenseForm from '../../components/expense/modal';
import Config from './../../Config.json';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

afterEach(cleanup);

describe("Testing add expense API", () => {

  test('when the amount is not greater than 0', async () => {

    window.alert = jest.fn();

    const amount = 0;
    const description = "outing";

    let user = { id: 1, name: 'shubham', phoneNumber: "dummy" };
    let otherUsers = [
      { id: 2, name: 'satyam', phoneNumber: "dummy" },
      { id: 3, name: 'chandan', phoneNumber: "dummy" }];

    window.fetch.mockResolvedValueOnce(() => Promise.reject({ status: 400 }));
    render(<AddExpenseForm show={true} otherUsers={otherUsers} user={user}></AddExpenseForm>);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: description },
    });
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByTestId('payer-drop-down'), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(window.fetch).toHaveBeenCalledTimes(0);
      expect(window.alert).toBeCalledWith('Please enter valid amount for this expense');
    });
  });

  test('when the description is empty', async () => {

    window.alert = jest.fn();

    const amount = 67;
    const description = "";

    let user = { id: 1, name: 'shubham', phoneNumber: "dummy" };
    let otherUsers = [
      { id: 2, name: 'satyam', phoneNumber: "dummy" },
      { id: 3, name: 'chandan', phoneNumber: "dummy" }];

    window.fetch.mockResolvedValueOnce(() => Promise.reject({ status: 400 }));
    render(<AddExpenseForm show={true} otherUsers={otherUsers} user={user}></AddExpenseForm>);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: description },
    });
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByTestId('payer-drop-down'), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(window.fetch).toHaveBeenCalledTimes(0);
      expect(window.alert).toBeCalledWith('Please enter a descrption for this expense');
    });
  });

  test('when the payer is not set', async () => {

    window.alert = jest.fn();

    const amount = 67;
    const description = "outing";

    let user = { id: 1, name: 'shubham', phoneNumber: "dummy" };
    let otherUsers = [
      { id: 2, name: 'satyam', phoneNumber: "dummy" },
      { id: 3, name: 'chandan', phoneNumber: "dummy" }];

    window.fetch.mockResolvedValueOnce(() => Promise.reject({ status: 400 }));
    render(<AddExpenseForm show={true} otherUsers={otherUsers} user={user}></AddExpenseForm>);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: description },
    });
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(window.fetch).toHaveBeenCalledTimes(0);
      expect(window.alert).toBeCalledWith('Please assign a payer for this expense');
    });
  });

  test('when the debtors is not set', async () => {

    window.alert = jest.fn();

    const amount = 67;
    const description = "outing";

    let user = { id: 1, name: 'shubham', phoneNumber: "dummy" };
    let otherUsers = [
      { id: 2, name: 'satyam', phoneNumber: "dummy" },
      { id: 3, name: 'chandan', phoneNumber: "dummy" }];

    window.fetch.mockResolvedValueOnce(() => Promise.reject({ status: 400 }));
    render(<AddExpenseForm show={true} otherUsers={otherUsers} user={user}></AddExpenseForm>);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: description },
    });
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByTestId('payer-drop-down'), {
      target: { value: 1 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(window.fetch).toHaveBeenCalledTimes(0);
      expect(window.alert).toBeCalledWith('Please assign debtors for this expense');
    });
  });

  test('when all fields are valid and api is being called', async () => {

    const token = undefined;
    const amount = 798.2;
    const description = "outing";
    const payerId = 3;
    const debtorIds = [2, 3, 1];

    window.fetch.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
    let close = (val) => { console.log(val); }
    let user = { id: 1, name: 'shubham', phoneNumber: "dummy" };
    let otherUsers = [
      { id: 2, name: 'satyam', phoneNumber: "dummy" },
      { id: 3, name: 'chandan', phoneNumber: "dummy" }];

    render(<AddExpenseForm show={true} onHide={close} otherUsers={otherUsers} user={user}></AddExpenseForm>);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: description },
    });
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByTestId('payer-drop-down'), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 0 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByTestId('debtor-drop-down'), {
      target: { value: 2 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        Config.Config.url + "/expenses", {
        "body": JSON.stringify({
          description: description,
          amount: amount,
          payerId: payerId,
          debtorIds: debtorIds
        }),
        "headers": {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json',
          'authToken': token
        },
        "method": "post"
      });
    });
  });

});
