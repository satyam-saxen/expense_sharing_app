import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Cookies from 'universal-cookie';
import Homepage from './../homepage';

afterEach(cleanup);

describe('Homepage content', () => {
    test('renders homepage correctly', () => {
        render(<Homepage></Homepage>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

describe('Button event 1', () => {
    test('Show alert message', () => {
        window.alert = jest.fn();
        render(<Homepage></Homepage>);
        const node = screen.getByText('Logout');
        fireEvent.click(node);
        expect(window.alert).toBeCalledWith('Already logged out');
    });
  });
  
describe('Button event 2', () => {
    test('Render to sign-up pge', () => {
        const cookie = new Cookies();
        cookie.set('esaUserToken','dummy login',{path:'/'});
        render(<Homepage></Homepage>);
        const node = screen.getByText('Logout');
        fireEvent.click(node);
        expect(cookie.get('esaUserToken')).toBeUndefined();
    });
  });

