import { BaseLayout } from '@/layouts/BaseLayout';
import { ReactElement, useState } from 'react';
import classes from './ForumPage.module.scss';
import { Button, Card, Flex, Form, Input, Modal } from 'antd';

export const ForumPage = (): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <BaseLayout>
      <Flex justify="center">
        <section className={classes.wrapper}>
          <h1 className={classes.header}>Forum</h1>
          <Flex justify="flex-end" className={classes.addTopic}>
            <Button type="primary" onClick={showModal}>
              Add topic
            </Button>

            <Modal
              footer={null}
              title="New Topic"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} className={classes.newComment}>
                <Form.Item name="Title" rules={[{ required: true }]}>
                  <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="Description" rules={[{ required: true }]}>
                  <Input.TextArea
                    placeholder="Description"
                    rows={3}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                  />
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
            </Modal>
          </Flex>
          <div className={classes.topicsList}>
            {[0, 1, 2].map((index) => (
              <Card
                key={index}
                type="inner"
                title="Inner Card title"
                extra={
                  <a style={{ color: '#1677ff' }} href="/forum/1">
                    More
                  </a>
                }
              >
                <div className={classes.topicContent}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, commodi rem
                  nesciunt neque illum laborum placeat soluta reprehenderit officia beatae porro
                  reiciendis similique dolores nulla deleniti blanditiis odio rerum a? reiciendis
                  similique dolores nulla deleniti blanditiis odio rerum a? reiciendis similique
                  dolores nulla deleniti blanditiis odio rerum a? reiciendis similique dolores nulla
                  deleniti blanditiis odio rerum a?
                </div>
                <Flex justify="space-between">
                  <h4>Author: Ilon Mask</h4>
                  <Flex gap={16}>
                    <span>
                      <span style={{ color: '#1677ff' }}>Likes: </span> 10
                    </span>
                    <span>
                      <span style={{ color: '#1677ff' }}>Comments: </span>16
                    </span>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </div>
        </section>
      </Flex>
    </BaseLayout>
  );
};
