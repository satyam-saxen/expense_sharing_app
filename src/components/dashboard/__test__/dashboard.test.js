import "@testing-library/jest-dom/extend-expect";
import { cleanup,render } from '@testing-library/react';
import Dashboard from './../dashboard';

afterEach(cleanup);

describe("Dashboard testing with below tests",()=>{
    it("tests for all components to be render on page",()=>{
        const {getByText} = render(<Dashboard></Dashboard>);
        expect(getByText('Expense Sharing App')).toBeInTheDocument();
        expect(getByText('Logout')).toBeInTheDocument();
        expect(getByText('Debts')).toBeInTheDocument();
        expect(getByText('Expenses')).toBeInTheDocument();
        expect(getByText('Add an Expense')).toBeInTheDocument();
    });
});
