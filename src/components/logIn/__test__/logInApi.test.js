import React from "react";
import axios from 'axios';
import { screen, render, fireEvent, waitFor, findByRole } from "@testing-library/react";
import "@testing-library/jest-dom";
import API from './../logInApi';
import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event";

jest.mock('axios');

describe('Form', () => {
    test('fetch response from API to validate user', async () => { 
        const jsdomAlert = window.alert; 
        window.alert = () => {};
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

        await act(async () => {
        const { findByText } = render(<API></API>);

        await waitFor(() => findByText(/Welcome!/i));
        const element = await findByText(/Welcome!/i);
        expect(element).toBeInTheDocument();
        });
        window.alert = jsdomAlert;
    });

    test('fetches response for Bad Request from the API', async () => { 
        const jsdomAlert = window.alert;
        window.alert = () => {};
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: 401 }));

        await act(async () => {
        const { findByText } = render(<API></API>);

        await waitFor(() => findByText(/Unauthorized/i));
        const element = await findByText(/Unauthorized/i);
        expect(element).toBeInTheDocument();
        });
        window.alert = jsdomAlert;
    });

    test('fetches response for Not Found from the API', async () => { 
        const jsdomAlert = window.alert;
        window.alert = () => {};
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: 404 }));

        await act(async () => {
        const { findByText } = render(<API></API>);

        await waitFor(() => findByText(/Not Found!/i));
        const element = await findByText(/Not Found!/i);
        expect(element).toBeInTheDocument();
        });
        window.alert = jsdomAlert;
    });
  });