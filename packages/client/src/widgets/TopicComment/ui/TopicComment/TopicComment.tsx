import { Avatar, Flex } from 'antd';
import React, { FC } from 'react';
import classes from './TopicComment.module.scss';
import { IComment } from '@/entities/Topics/model';

export const TopicComment: FC<IComment> = (data) => {
  return (
    <Flex gap={12}>
      <Avatar size="small" icon={data.author.first_name[0]} />
      <Flex gap={4} vertical className={classes.commentRightBlock}>
        <h5>{`${data.author.first_name} ${data.author.second_name}`}</h5>
        <p>{data.content}</p>
        <span className={classes.commentDate}>{new Date(data.createdAt).toLocaleDateString()}</span>
      </Flex>
    </Flex>
  );
};
