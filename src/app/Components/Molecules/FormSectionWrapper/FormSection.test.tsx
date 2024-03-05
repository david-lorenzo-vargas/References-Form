import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

import FormSectionWrapper from '.';

const title = 'Modal title'

const ChildComponent = () => {
  return (
    <div data-testid="ChildComponent">ChildComponent</div>
  );
};

const renderFormSectionWrapper = () =>
  render(<FormSectionWrapper title={title}><ChildComponent /></FormSectionWrapper>);

describe('formSectionWrapper', () => {
  test('should render', () => {
    renderFormSectionWrapper();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should render a child component', () => {
    renderFormSectionWrapper();
    expect(screen.getByTestId("ChildComponent")).toBeInTheDocument();
  });
});