import React, { FC, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { REACTION_ICONS } from '../../model';
import { EReactions } from '@/shared/types';
import { ITopicsSchema } from '@/entities/Topics';
import classes from './SelectedEmojis.module.scss';
import { SelectedEmojisProps } from './SelectedEmojis.interfaces';

export const SelectedEmojis: FC<SelectedEmojisProps> = ({ commentId }) => {
  const reactions = useSelector(
    (state: { topics: ITopicsSchema }) => state.topics.commentsReactions[commentId] || [],
    shallowEqual
  );

  const memoizedReactions = useMemo(() => reactions, [reactions]);

  return (
    <div className={classes.selectedEmojis}>
      {memoizedReactions.map((reaction: EReactions, index: number) => (
        <span key={index}>{REACTION_ICONS[reaction]}</span>
      ))}
    </div>
  );
};
