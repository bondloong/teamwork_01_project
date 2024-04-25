import { render } from '@testing-library/react';
import { Application } from './Application';
import '@testing-library/jest-dom';

test('Application should render page correctly', () => {
  const { queryByText, getByAltText } = render(<Application />);
  // if user is not logged in
  // const title = queryByText('Log In');

  // if user is logged in

  const title = queryByText('Explore the Universe');
  expect(title).toBeVisible();

  // assert that the image is loaded correctly
  const image = getByAltText('Starship Screenshot');
  expect(image).toBeInTheDocument();

  // Assert that the navigation links are present
  const forumLink = queryByText('Join the Community');
  expect(forumLink).toBeInTheDocument();

  const leaderboardLink = queryByText('Compete for Glory');
  expect(leaderboardLink).toBeInTheDocument();

  const profileLink = queryByText('Customize Your Ship');
  expect(profileLink).toBeInTheDocument();

  const gameLink = queryByText('Start Your Adventure');
  expect(gameLink).toBeInTheDocument();
});
