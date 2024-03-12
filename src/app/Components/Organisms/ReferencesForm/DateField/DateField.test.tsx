import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
      buttonId="buttonId"
    />);

describe('DateField', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    renderDateField();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should call onDateField when button is clicked and is not disabled', async () => {
    renderDateField();
    fireEvent.click(screen.getByRole('button', {name: 'dateFieldButton'}));
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it('should render placeholder if date is not passed as props', () => {
    renderDateField();
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('should render date if date is passed as props instead of placeholder', () => {
    renderDateField(new Date());
    expect(screen.getByText(new Date().toLocaleDateString())).toBeInTheDocument();
  });
});