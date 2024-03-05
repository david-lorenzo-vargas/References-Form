import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react';
import { beforeEach, describe } from 'node:test';

import DateField from '.';

const mockOnClick = jest.fn();
const title = 'Modal title';
const placeholder = 'date placeholder';

const renderDateField = (date?: Date | undefined) =>
  render(<DateField
      title={title}
      onDateField={() => mockOnClick()}
      date={date}
      placeholder={placeholder}
    />);

describe('dateField', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should render', () => {
    renderDateField();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should call onDateField when button is clicked and is not disabled', async () => {
    renderDateField();
    fireEvent.click(screen.getByRole('button', {name: 'dateFieldButton'}));
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should render placeholder if date is not passed as props', () => {
    renderDateField();
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  test('should render date if date is passed as props instead of placeholder', () => {
    renderDateField(new Date());
    expect(screen.getByText(new Date().toLocaleDateString())).toBeInTheDocument();
  });
});