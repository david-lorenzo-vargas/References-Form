import { render, screen } from '@testing-library/react';

import FormSectionWrapper from '.';

const title = 'Modal title'

const ChildComponent = () => {
  return (
    <div data-testid="ChildComponent">ChildComponent</div>
  );
};

const renderFormSectionWrapper = () =>
  render(<FormSectionWrapper title={title}><ChildComponent /></FormSectionWrapper>);

describe('FormSectionWrapper', () => {
  it('should render', () => {
    renderFormSectionWrapper();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render a child component', () => {
    renderFormSectionWrapper();
    expect(screen.getByTestId("ChildComponent")).toBeInTheDocument();
  });
});