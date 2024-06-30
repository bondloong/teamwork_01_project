import { ITopic } from '@/entities/Topics/model';
import { Card, Flex, Typography } from 'antd';
import React, { FC } from 'react';
import classes from './TopicCard.module.scss';

export const TopicCard: FC<ITopic> = (data) => {
  return (
    <Card
      type="inner"
      title={data.title}
      extra={
        <a style={{ color: '#1677ff' }} href={`/forum/${data.id}`}>
          More
        </a>
      }
    >
      <div className={classes.topicContent}>{data.content}</div>
      <Typography style={{ fontSize: 14 }}>
        {`${data.author.first_name} ${data.author.second_name}`}
      </Typography>
      <Flex justify="space-between">
        <Typography style={{ fontSize: 14, color: '#1677ff' }}>
          {new Date(data.createdAt).toLocaleDateString()}
        </Typography>
        <Flex gap={16}>
          <span>
            <span style={{ color: '#1677ff' }}>Likes: </span> {data.likedUsers.length}
          </span>
        </Flex>
      </Flex>
    </Card>
  );
};
