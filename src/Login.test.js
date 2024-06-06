// src/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    // Mock local storage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Add sample user to local storage
    localStorage.setItem('user', JSON.stringify({ email: 'abhi@example.com', password: '112345' }));
  });

  test('renders the sign in header', () => {
    render(<Login />);
    const headerElement = screen.getByText(/Sign in/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders email and password input fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders the sign in button', () => {
    render(<Login />);
    const signInButton = screen.getByText(/Sign In/i);
    expect(signInButton).toBeInTheDocument();
  });

  test('handles successful login', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'abhi@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '112345' } });
    fireEvent.click(signInButton);

    expect(window.alert).toHaveBeenCalledWith('Login successful!');
    expect(window.location.href).toBe('/home');
  });

  test('handles login error', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith('Login failed: Invalid email or password');
  });
});

// Mock window.alert and window.location.href
beforeAll(() => {
  window.alert = jest.fn();
  delete window.location;
  window.location = { href: '' };
});

afterAll(() => {
  jest.clearAllMocks();
});
