import { AddTopicForm } from '@/widgets/AddTopicForm';
import { Button, Flex, Modal } from 'antd';
import React, { FC, useState } from 'react';

export const AddTopicModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <Flex justify="flex-end">
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
        <AddTopicForm closeModal={handleCancel} />
      </Modal>
    </Flex>
  );
};
