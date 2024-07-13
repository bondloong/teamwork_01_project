import { Avatar, Flex } from 'antd';
import React, { FC } from 'react';
import classes from './TopicComment.module.scss';
import { IComment } from '@/entities/Topics/model';
import { ReactionEmojiPicker, SelectedEmojis } from '@/features/ReactionEmojiPicker';

export const TopicComment: FC<IComment> = (data) => {
  return (
    <ReactionEmojiPicker commentId={data.id}>
      <Flex className={classes.comment} gap={12}>
        <Avatar size="small" icon={data.author.first_name[0]} />
        <Flex gap={4} vertical className={classes.commentRightBlock}>
          <div className={classes.commentHeader}>
            <h5>{`${data.author.first_name} ${data.author.second_name}`}</h5>
            <span className={classes.commentDate}>
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p>{data.content}</p>
          <Flex justify="end">
            <SelectedEmojis commentId={data.id} />
          </Flex>
        </Flex>
      </Flex>
    </ReactionEmojiPicker>
  );
};
