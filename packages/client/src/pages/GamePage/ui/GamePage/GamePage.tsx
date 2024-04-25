import { BaseLayout } from '@/layouts/BaseLayout';
import Game from '@/widgets/1';
import { ReactElement } from 'react';

export const GamePage = (): ReactElement => {
  return (
    <BaseLayout>
      <h1>GamePage</h1>
      <Game width={1000} height={500} />
    </BaseLayout>
  );
};
