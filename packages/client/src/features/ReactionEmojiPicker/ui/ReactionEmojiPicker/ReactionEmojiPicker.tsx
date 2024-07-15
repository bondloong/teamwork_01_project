import React, { FC } from 'react';
import { Popover } from 'antd';
import { EmojiList } from '../EmojiList';
import { useAppDispatch } from '@/shared/hooks';
import { ECommentReactions } from '@/shared/types';
import { topicsActions } from '@/entities/Topics/model/slice/topicsSlice';

interface ReactionEmojiPickerProps {
  commentId: string;
  children: React.ReactNode;
}

export const ReactionEmojiPicker: FC<ReactionEmojiPickerProps> = ({ commentId, children }) => {
  const dispatch = useAppDispatch();

  const handleReaction = (reaction: ECommentReactions): void => {
    dispatch(topicsActions.toggleReaction({ commentId, reaction }));
  };

  return (
    <Popover
      content={<EmojiList reactions={Object.values(ECommentReactions)} onClick={handleReaction} />}
      placement="rightBottom"
      trigger="contextMenu"
    >
      {children}
    </Popover>
  );
};
