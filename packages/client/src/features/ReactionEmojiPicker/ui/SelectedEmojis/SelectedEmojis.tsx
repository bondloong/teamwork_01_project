import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { REACTION_ICONS } from '../../model';
import { ECommentReactions } from '@/shared/types';
import { ITopicsSchema } from '@/entities/Topics';
import classes from './SelectedEmojis.module.scss';
import { SelectedEmojisProps } from './SelectedEmojis.interfaces';

export const SelectedEmojis: FC<SelectedEmojisProps> = ({ commentId }) => {
  const reactions = useSelector(
    (state: { topics: ITopicsSchema }) => state.topics.commentsReactions[commentId] || [],
    shallowEqual
  );

  return (
    <div className={classes.selectedEmojis}>
      {reactions.map((reaction: ECommentReactions, index: number) => (
        <span key={index}>{REACTION_ICONS[reaction]}</span>
      ))}
    </div>
  );
};
