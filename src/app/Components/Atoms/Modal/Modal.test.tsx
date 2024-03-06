import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react';

import Modal from '.';

const mockOnClick = jest.fn();
const title = 'Modal title'

const ChildComponent = () => {
  return (
    <div data-testid="ChildComponent">ChildComponent</div>
  );
};

const renderModal = () =>
  render(<Modal title={title} onClose={() => mockOnClick()}><ChildComponent /></Modal>);

describe('Modal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    renderModal();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should call onClose when button is clicked', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', {name: 'closeButton'}));
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it('should render a child component', () => {
    renderModal();
    expect(screen.getByTestId("ChildComponent")).toBeInTheDocument();
  });
});