import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import startUpData from './../dataService/dataService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status:200 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});
describe("Testing loading data-fetch API",()=>{

    test('when data request promise is resolved', async () => {
        const token="auth-token";
        fetch.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
        const response = await startUpData({token});
        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/aggregated-data", { 
            "headers": {"Content-Type": "application/json", "authToken":token}, "method": "get"}
        );
        expect(response.status).toBe(200);
    });
    
    test('when request is rejected', async () => {
        const token="auth-token";
        let error;
        fetch.mockImplementationOnce(() => Promise.reject({ status: 500 }));
        try{
            const response = await startUpData({token});
        }
        catch(e){
            error = e;
        }
        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/aggregated-data", { 
            "headers": {"Content-Type": "application/json", "authToken":token}, "method": "get"}
        );
        expect(error.status).toBe(500);
    });
});
