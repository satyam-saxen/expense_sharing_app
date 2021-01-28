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
  });