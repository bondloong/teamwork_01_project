import { BaseLayout } from '@/layouts/BaseLayout';
import { LeaderBoard } from '@/widgets/LeaderBoard';
import { ReactElement } from 'react';
import classes from './LeaderboardPage.module.scss';
import { Flex } from 'antd';

export const LeaderboardPage = (): ReactElement => {
  return (
    <BaseLayout>
      <Flex justify="center">
        <section className={classes.wrapper}>
          <h1 className={classes.header}>LeaderboardPage</h1>

          <LeaderBoard />
        </section>
      </Flex>
    </BaseLayout>
  );
};
