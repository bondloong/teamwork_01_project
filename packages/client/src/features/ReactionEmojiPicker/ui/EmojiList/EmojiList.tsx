import React, { FC, useMemo } from 'react';
import { Button, Flex } from 'antd';
import { REACTION_ICONS } from '../../model';
import { IEmojiList } from './EmojiList.interfaces';
import classes from './EmojiList.module.scss';

export const EmojiList: FC<IEmojiList> = ({ reactions, onClick }) => {
  return useMemo(() => {
    return (
      <Flex gap={8}>
        {reactions.map((reaction, index) => (
          <Button
            className={classes.emojiButton}
            key={index}
            shape="circle"
            onClick={() => onClick(reaction)}
          >
            {REACTION_ICONS[reaction]}
          </Button>
        ))}
      </Flex>
    );
  }, [reactions]);
};
