import { render } from '@testing-library/react';
import { Application } from './Application';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { createReduxStore } from '../../model';

const store = createReduxStore();

test('Application should render page correctly', () => {
  const text = 'Some content';
  const content = <div>{text}</div>;

  const { queryByText } = render(
    <Provider store={store}>
      <Application>{content}</Application>{' '}
    </Provider>
  );

  const element = queryByText(text);

  expect(element).toBeVisible();
});
