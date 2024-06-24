import { Avatar, Flex } from 'antd';
import React, { FC } from 'react';
import classes from './TopicComment.module.scss';

export const TopicComment: FC = () => {
  return (
    <Flex gap={12}>
      <Avatar size="small" icon={'f'} />
      <Flex gap={4} vertical className={classes.commentRightBlock}>
        <h5>Ilon mAsk</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minima cumque?</p>
        <span className={classes.commentDate}>23.06.2024</span>
      </Flex>
    </Flex>
  );
};
