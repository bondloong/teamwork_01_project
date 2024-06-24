import { BaseLayout } from '@/layouts/BaseLayout';
import { Breadcrumb, Button, Empty, Flex, Form, Input } from 'antd';
import { ReactElement } from 'react';
import classes from './TopicPage.module.scss';
import { TopicComment } from '@/widgets/TopicComment';

export const TopicPage = (): ReactElement => {
  const [form] = Form.useForm();

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

          <p className={classes.topicDate}>23.06.2024</p>
          <h1 className={classes.header}>Topic Title</h1>
          <h3 className={classes.author}>Author: Ilon Mask</h3>

          <div className={classes.topicContent}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In esse tempora quod, possimus
            ad expedita laudantium facilis, eum repellat rem impedit? Earum exercitationem qui quo
            facilis deleniti distinctio corporis iste!
          </div>
          <span className={classes.commentLike}>
            <span style={{ color: '#1677ff' }}>Likes: </span> 10
          </span>

          <div className={classes.comments}>
            <h2 className={classes.header}>Comments</h2>
            {[1].length === 0 ? (
              <Empty description={false} />
            ) : (
              <Flex vertical gap={16} className={classes.commentsWrapper}>
                <TopicComment />
                <TopicComment />
                <TopicComment />
                <TopicComment />
                <TopicComment />
              </Flex>
            )}
          </div>

          <Form form={form} className={classes.newComment}>
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
