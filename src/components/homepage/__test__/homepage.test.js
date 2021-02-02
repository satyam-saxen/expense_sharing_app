import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Cookies from 'universal-cookie';
import Homepage from './../homepage';

afterEach(cleanup);

describe('Homepage content', () => {
    test('renders homepage correctly', () => {
        render(<Homepage></Homepage>);
        expect(screen.getByText('Expense Sharing App')).toBeInTheDocument();
    });
  });

describe('Button events', () => {
    test('Check alert message when cookie is not set', () => {
        window.alert = jest.fn();
        render(<Homepage></Homepage>);
        const node = screen.getByText('Logout');
        fireEvent.click(node);
        expect(window.alert).toBeCalledWith('Already logged out');
    });
  
    test('Checks the deletion of cookie when cookie is set', () => {
        const cookie = new Cookies();
        cookie.set('esaUserToken','dummy login token',{path:'/'});
        render(<Homepage></Homepage>);
        const node = screen.getByText('Logout');
        fireEvent.click(node);
        expect(cookie.get('esaUserToken')).toBeUndefined();
    });
  });
