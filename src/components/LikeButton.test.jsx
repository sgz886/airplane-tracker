import { test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import LikeButton from './LikeButton';

test('render LikeButton', () => {
  const { getByRole } = render(<LikeButton />);
  const btnElement = getByRole('button');
  expect(btnElement).toBeInTheDocument();
});
