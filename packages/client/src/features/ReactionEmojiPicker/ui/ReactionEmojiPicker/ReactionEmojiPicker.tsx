import React, { FC } from 'react';
import { Popover } from 'antd';
import { EmojiList } from '../EmojiList';
import { useAppDispatch } from '@/shared/hooks';
import { EReactions } from '@/shared/types';
import { topicsActions } from '@/entities/Topics/model/slice/topicsSlice';

interface ReactionEmojiPickerProps {
  commentId: string;
  children: React.ReactNode;
}

export const ReactionEmojiPicker: FC<ReactionEmojiPickerProps> = ({ commentId, children }) => {
  const dispatch = useAppDispatch();

  const handleReaction = (reaction: EReactions): void => {
    dispatch(topicsActions.toggleReaction({ commentId, reaction }));
  };

  return (
    <Popover
      content={<EmojiList reactions={Object.values(EReactions)} onClick={handleReaction} />}
      placement="rightBottom"
      trigger="contextMenu"
    >
      {children}
    </Popover>
  );
};
