import 'core-js';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Signup from './Signup';

jest.mock('axios');

describe('Signup component', () => {
  test('should render signup form and handle successful signup', async () => {
    const mockedApiResponse = { data: { message: 'User successfully registered' } };
    axios.post.mockResolvedValue(mockedApiResponse);

    render(<Signup />);

    const usernameInput = screen.getByPlaceholderText('Set your username');
    const passwordInput = screen.getByPlaceholderText('Set your password');
    const signupButton = screen.getByText('Signup');

    // Fill in the form
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Click the signup button
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText('User successfully registered. Please login to continue!')).toBeInTheDocument();
    });
  });

  test('should render signup form and handle signup error', async () => {
    const mockedErrorResponse = { response: { data: { message: 'User already registered' } } };
    axios.post.mockRejectedValue(mockedErrorResponse);

    render(<Signup />);

    const usernameInput = screen.getByPlaceholderText('Set your username');
    const passwordInput = screen.getByPlaceholderText('Set your password');
    const signupButton = screen.getByText('Signup');

    // Fill in the form
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Click the signup button
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText('User already registered')).toBeInTheDocument();
    });
  });
});
