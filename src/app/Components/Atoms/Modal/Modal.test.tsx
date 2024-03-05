import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react';
import { beforeEach, describe } from 'node:test';

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

describe('modal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should render', () => {
    renderModal();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should call onClose when button is clicked', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', {name: 'closeButton'}));
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should render a child component', () => {
    renderModal();
    expect(screen.getByTestId("ChildComponent")).toBeInTheDocument();
  });
});