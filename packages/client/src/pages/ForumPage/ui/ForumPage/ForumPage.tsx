import { BaseLayout } from '@/layouts/BaseLayout';
import { ReactElement, useEffect } from 'react';
import classes from './ForumPage.module.scss';
import { Flex } from 'antd';
import { AddTopicModal } from '@/widgets/AddTopicModal';
import { TopicCard } from '@/widgets/TopicCard';
import { useAppDispatch } from '@/shared/hooks';
import { fetchTopics, getTopics } from '@/entities/Topics';
import { useSelector } from 'react-redux';
import { Loader } from '@/shared/ui';
import { fetchTopicAuthor } from '@/entities/Topics/api';
import { getUserData } from '@/entities/User';
import { createTopicAuthor } from '@/entities/Topics/api/createTopicAuthor';

export const ForumPage = (): ReactElement => {
  const { data, isLoading, isNewTopicLoading } = useSelector(getTopics);
  const user = useSelector(getUserData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchTopicAuthor(user.id)).then((result) => {
        if (result.meta.requestStatus === 'rejected') {
          dispatch(
            createTopicAuthor({
              yandexUserId: String(user.id),
              first_name: user.first_name,
              second_name: user.second_name,
            })
          );
        }
      });
    }
  }, [user]);

  // Обновляем список топиков при изменении isNewTopicLoading
  useEffect(() => {
    if (!isNewTopicLoading) {
      dispatch(fetchTopics());
    }
  }, [isNewTopicLoading]);

  return (
    <BaseLayout>
      <Flex justify="center">
        <section className={classes.wrapper}>
          <h1 className={classes.header}>Forum</h1>
          <AddTopicModal />
          <div className={classes.topicsList}>
            {isLoading ? (
              <Loader />
            ) : (
              [...data].reverse().map((topic) => <TopicCard key={topic.id} {...topic} />)
            )}
          </div>
        </section>
      </Flex>
    </BaseLayout>
  );
};
