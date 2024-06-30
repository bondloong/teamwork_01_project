import { BaseLayout } from '@/layouts/BaseLayout';
import { Breadcrumb, Button, Empty, Flex, Form, Input } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import classes from './TopicPage.module.scss';
import { TopicComment } from '@/widgets/TopicComment';
import { IComment, ITopic, getTopics } from '@/entities/Topics/model';
import { fetchComments, fetchTopic } from '../../api';
import { Loader } from '@/shared/ui';
import { useParams } from 'react-router-dom';
import { CreateCommentProps, createComment } from '../../api/createComment';
import { addLikeToTopic } from '../../api/addLikeToTopic';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { getUserData } from '@/entities/User';
import { fetchTopicAuthor } from '@/entities/Topics/api';
import { createTopicAuthor } from '@/entities/Topics/api/createTopicAuthor';
import { removeLikeFromTopic } from '../../api/removeLikeFromTopic';
import { LikeTwoTone } from '@ant-design/icons';

interface FormValues {
  comment: string;
}

export const TopicPage = (): ReactElement => {
  const [form] = Form.useForm();
  const [topic, setTopic] = useState<ITopic>();
  const [topicComments, setTopicComments] = useState<IComment[]>([]);
  const { topicId } = useParams();
  const { topicAuthor } = useSelector(getTopics);
  const dispatch = useAppDispatch();
  const user = useSelector(getUserData);

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

  useEffect(() => {
    if (topicId) {
      fetchTopic(topicId).then((result) => {
        setTopic(result);
        fetchComments(result.id).then((result) => {
          setTopicComments(result);
        });
      });
    }
  }, []);

  if (!topic || !topicAuthor) {
    return <Loader />;
  }
  const addComment = (value: FormValues): void => {
    const data: CreateCommentProps = {
      content: value.comment,
      authorId: topicAuthor!.id,
      topicId: topic.id,
    };

    createComment(data).then((result) => {
      setTopicComments((prev) => [...prev, result]);
    });
  };

  const changeLike = (): void => {
    if (topic.likedUsers.find((id) => id === topicAuthor.id)) {
      removeLikeFromTopic({
        userId: topicAuthor!.id,
        topicId: topic.id,
      }).then((result) => {
        setTopic(result);
      });
    } else {
      addLikeToTopic({
        userId: topicAuthor!.id,
        topicId: topic.id,
      }).then((result) => {
        setTopic(result);
      });
    }
  };

  return (
    <BaseLayout>
      <Flex justify="center">
        <section className={classes.wrapper}>
          <Breadcrumb
            items={[
              {
                href: '/',
                title: 'Home',
              },
              {
                href: '/forum',
                title: 'Forum',
              },
              {
                title: 'Topic Title',
              },
            ]}
          />

          <p className={classes.topicDate}>{new Date(topic.createdAt).toLocaleDateString()}</p>
          <h1 className={classes.header}>{topic.title}</h1>
          <h3 className={classes.author}>
            Author: {`${topic.author.first_name} ${topic.author.second_name}`}
          </h3>

          <div className={classes.topicContent}>{topic.content}</div>
          <span className={classes.commentLike}>
            <LikeTwoTone style={{ fontSize: 18 }} onClick={changeLike} /> {topic.likedUsers.length}
          </span>

          <div className={classes.comments}>
            <h2 className={classes.header}>Comments</h2>
            {topicComments.length === 0 ? (
              <Empty description={false} />
            ) : (
              <Flex vertical gap={16} className={classes.commentsWrapper}>
                {topicComments.map((comment, i) => (
                  <TopicComment key={i} {...comment} />
                ))}
              </Flex>
            )}
          </div>

          <Form<FormValues> form={form} className={classes.newComment} onFinish={addComment}>
            <Form.Item name="comment" rules={[{ required: true }]}>
              <Input.TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }} />
            </Form.Item>

            <Form.Item>
              <Flex gap="small">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button danger onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </section>
      </Flex>
    </BaseLayout>
  );
};
