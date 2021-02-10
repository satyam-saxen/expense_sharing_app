import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';
import AddExpenseForm from './../modal';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

afterEach(cleanup);

describe("Dashboard's snapshot test", () => {
  it("Sapshot Matching of whole form", () => {
    const tree = renderer.create(<AddExpenseForm otherUsers={null} user={null}></AddExpenseForm>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Dashboard element's test", () => {

  it("Should render all texts correctly correctly", () => {
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByText(/Add New Expense/)).toBeInTheDocument();
    expect(screen.getByText('Payer')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Debtors')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it("Should render all text boxes and button correctly", () => {
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Total Amount Spent')).toBeInTheDocument();
    expect(screen.getByTestId('payer-drop-down')).toBeInTheDocument();
    expect(screen.getByTestId('debtor-drop-down')).toBeInTheDocument();
  });
});

describe("Dashboard fire events tests", () => {
  it('should check for the amount to be in double format', () => {
    const amount = 567.67;
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByPlaceholderText('Total Amount Spent').value).toBe('');
    fireEvent.change(screen.getByPlaceholderText('Total Amount Spent'), { target: { value: amount } });
    expect(parseFloat(screen.getByPlaceholderText('Total Amount Spent').value)).toBe(amount);
  });

  it('Should check for the correct rendering of description value', () => {
    const desc = 'Street Food';
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByPlaceholderText('Description').value).toBe('');
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: desc } });
    expect(screen.getByPlaceholderText('Description').value).toBe(desc);
  });

  test('Checks payer list drop down to be present', () => {
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByTestId('payer-drop-down').value).toBe("true");
  });

  test('Checks debtors list drop down to be present', () => {
    render(<AddExpenseForm show={true} otherUsers={null} user={null}></AddExpenseForm>);
    expect(screen.getByTestId('payer-drop-down').value).toBe("true");
  });
});