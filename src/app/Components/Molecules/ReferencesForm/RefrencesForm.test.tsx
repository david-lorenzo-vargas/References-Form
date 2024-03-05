import * as ReactHookForm from "react-hook-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReferencesForm from ".";
import { RelationShipEnum } from "../../../../../Types/types";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const renderForm = () => render(<ReferencesForm />);
const mockDate = new Date('2024-03-04T15:45:25.449Z');

describe('RefrencesForm', () => {
  let originalDate: DateConstructor;
  let dateSpy: jest.SpyInstance;

  beforeEach(() => {
    originalDate = global.Date;
    dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  });

  afterEach(() => {
    dateSpy.mockRestore();
    global.Date = originalDate;
  });

  it('should render all the fields', () => {
    renderForm();

    expect(screen.getByRole('textbox', { name: 'firstName' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'lastName' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'personalAddress' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'employerName' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'guarantorName' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'guarantorAddress' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'dateFieldButton' })).toHaveLength(2);
    expect(screen.getByText('I am currently working')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Relationship to guarantor' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('send button should be active when all the fields are filled in and send data when clicked', async () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: 'Send' });

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox', { name: 'firstName' }), { target: { value: 'first name' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'lastName' }), { target: { value: 'last name' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'personalAddress' }), { target: { value: 'personalAddress' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'employerName' }), { target: { value: 'employerName' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'guarantorName' }), { target: { value: 'guarantorName' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'guarantorAddress' }), { target: { value: 'guarantorAddress' } });
    fireEvent.click(screen.getByText('Select start date'));
    const datePickerInput = screen.getAllByRole('textbox')[6];
    expect(datePickerInput).toHaveValue('04/03/2024');

    fireEvent.click(datePickerInput);
    fireEvent.change(datePickerInput, {target: {value: new Date(mockDate)}});
    fireEvent.click(screen.getByText('I am currently working'));
    expect(screen.getAllByRole('button', { name: 'dateFieldButton' })[1]).toBeDisabled();

    fireEvent.click(screen.getByRole('combobox', { name: 'Relationship to guarantor' }));
    expect(screen.getByRole('option', { name: 'Employer' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: 'Employer' }));
  });
});