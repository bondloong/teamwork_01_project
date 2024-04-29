import { render } from '@testing-library/react';
import { Application } from './Application';
import '@testing-library/jest-dom';

test('Application should render page correctly', () => {
  const { queryByText, queryByAltText } = render(<Application />);

  const title = queryByText('Log In');

  expect(title).toBeVisible();

  const loader = queryByAltText('Loading...');

  expect(loader).toBeVisible();
});
