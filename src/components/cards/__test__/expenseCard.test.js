import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ExpenseCard from './../expense/expenseCard';

afterEach(cleanup);

describe("ExpenseCard",()=>{
    it("renders the expense card with data",async ()=>{
        const expense={
            description:"Holiday",
            amount:"200",
            payerName:"Prans",
            dateTime:new Date()
        };
        const {findByText} = await render(<ExpenseCard expense={expense}></ExpenseCard>);
        expect(await findByText('Holiday')).toBeInTheDocument();
        expect(await findByText('Paid by-Prans')).toBeInTheDocument();
        expect(await findByText('Feb')).toBeInTheDocument();
        expect(await findByText('4')).toBeInTheDocument();
    });

});
