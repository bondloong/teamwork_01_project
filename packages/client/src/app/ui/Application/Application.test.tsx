import { render } from '@testing-library/react';
import { Application } from './Application';
import '@testing-library/jest-dom';

test('Application should render page correctly', () => {
  const { queryByText } = render(<Application />);

  const title = queryByText('AuthPage');

  expect(title).toBeVisible();
});
