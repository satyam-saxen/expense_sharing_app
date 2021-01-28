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

        await waitFor(() => findByText(/Homepage/i));
        const element = await findByText(/Homepage/i);
        expect(element).toBeInTheDocument();
        });
        window.alert = jsdomAlert;
    });

    test('fetches response for Bad Request from the API', async () => { 
        const jsdomAlert = window.alert;
        window.alert = () => {};
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: 400 }));

        await act(async () => {
        const { findByText } = render(<API></API>);

        await waitFor(() => findByText(/Bad Request/i));
        const element = await findByText(/Bad Request/i);
        expect(element).toBeInTheDocument();
        });
        window.alert = jsdomAlert;
    });

    // test('fetches response from an API to create user with the phone number already exist', async () => { 
    //     const jsdomAlert = window.alert; // remember the jsdom alert
    //     window.alert = () => {};
    //     axios.post.mockImplementationOnce(() => Promise.resolve({ status: 409 }));

    //     await act(async () => {
    //     const { findByText } = render(<API></API>);

    //     await waitFor(() => findByText(/Number already exist/i));
    //     const element = await findByText(/Number already exist/i);
    //     expect(element).toBeInTheDocument();
    //     });
    //     window.alert = jsdomAlert;

    // });
  });