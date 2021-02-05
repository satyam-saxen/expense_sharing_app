import "@testing-library/jest-dom/extend-expect";
import { cleanup, render} from '@testing-library/react';
import DebtCard from "../debt/debtCard";

afterEach(cleanup);

describe("DebtCard",()=>{
    it("renders the debt card with data",async ()=>{
        const debt={
            debtor:"A",
            creditor:"B",
            amount:"20"
        };
        const {findByText} = await render(<DebtCard debt={debt}></DebtCard>);
        expect(await findByText('owes you')).toBeInTheDocument();
        expect(await findByText('A')).toBeInTheDocument();
        expect(await findByText('₹20')).toBeInTheDocument();
    });

    it("renders the debt card when the debtor is null",async ()=>{
        const debt={
            debtor:null,
            creditor:"B",
            amount:"20"
        };
        const {findByText} = await render(<DebtCard debt={debt}></DebtCard>);
        expect(await findByText('you owe')).toBeInTheDocument();
    });

    it("renders the debt card when the creditor is null",async ()=>{
        const debt={
            debtor:"A",
            creditor:null,
            amount:"20"
        };
        const {findByText} = await render(<DebtCard debt={debt}></DebtCard>);
        expect(await findByText('owes you')).toBeInTheDocument();
    });

    
});
