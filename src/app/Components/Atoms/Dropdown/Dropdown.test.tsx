
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe } from 'node:test';
import userEvent from '@testing-library/user-event';
import { UseFormRegisterReturn } from 'react-hook-form';

import Dropdown from '.';
import { RelationShipEnum } from '../../../../../Types/types';

const label = 'dropdown label';
const dropdownName = 'dropdownName';
const dropdownOptions = [
  {
    key: RelationShipEnum.sibling,
    label: 'Sibling'
  },
  {
    key: RelationShipEnum.employer,
    label: 'Employer'
  },
  {
    key: RelationShipEnum.other,
    label: 'Other'
  },
];

const renderDropdown = (register?: UseFormRegisterReturn) =>
  render(<Dropdown
    label={label}
    dropdownName={dropdownName}
    options={dropdownOptions}
    {...register}
  />);

describe('dropdown', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should render', () => {
    renderDropdown();
    expect(screen.getByRole('label', {name: label})).toBeInTheDocument();
  });

  it('should display the correct number of options', () => {
    renderDropdown();
    expect(screen.getAllByRole('option').length).toBe(dropdownOptions.length);
  });

  it('should allow user to change option', () => {
    renderDropdown();
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.click(selectElement);
    expect(screen.getByRole('option', { name: 'Employer' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: 'Employer' }));
    expect(screen.getByText('Employer')).toBeInTheDocument();
  });  
});
