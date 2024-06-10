import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import axios from 'axios';
import CarForm from './App';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CarForm', () => {
  it('renders the form correctly', () => {
    render(<CarForm />);
    expect(screen.getByText(/Car Information Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  // it('shows error message when invalid VIN is entered', async () => {
  //   render(<CarForm />);
  //   const vinInput = screen.getByLabelText(/VIN/i);
  //   fireEvent.change(vinInput, { target: { value: '3FA6P0H7[GR279184' } });
  //   await waitFor(() => {
  //     expect(screen.getByText(/Unable to fetch car information/i)).toBeInTheDocument();
  //   });
  // });

  // it('fetches car information when a valid VIN is entered', async () => {
  //   mockedAxios.get.mockResolvedValue({
  //     data: {
  //       Results: [{
  //         Make: 'Toyota',
  //         Model: 'Camry',
  //         ModelYear: '2020',
  //         ErrorCode: '0',
  //       }],
  //     },
  //   });

  //   render(<CarForm />);
  //   const vinInput = screen.getByLabelText(/VIN/i);
  //   fireEvent.change(vinInput, { target: { value: '3FA6P0H74GR279184' } });

  //   await waitFor(() => {
  //     expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  //     expect(screen.getByDisplayValue('Toyota')).toBeInTheDocument();
  //     expect(screen.getByDisplayValue('Camry')).toBeInTheDocument();
  //     expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
  //   });
  // });

  // it('handles form submission correctly', async () => {
  //   mockedAxios.post.mockResolvedValue({ data: {} });

  //   render(<CarForm />);
  //   const vinInput = screen.getByLabelText(/VIN/i);
  //   const submitButton = screen.getByRole('button', { name: /Submit/i });

  //   fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  //     expect(alert).toHaveBeenCalledWith('Form submitted successfully!');
  //   });
  // });
});