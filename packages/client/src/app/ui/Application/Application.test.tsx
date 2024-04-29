import { render } from '@testing-library/react';
import { Application } from './Application';
import '@testing-library/jest-dom';

test('Application should render page correctly', () => {
  const { queryByAltText } = render(<Application />);

  const loader = queryByAltText('Loading...');

  expect(loader).toBeVisible();
});
