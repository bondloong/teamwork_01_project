import { ECommentReactions } from '@/shared/types';

export const REACTION_ICONS: Record<ECommentReactions, string> = {
  [ECommentReactions.HEART]: String.fromCodePoint(0x1f9e1),
  [ECommentReactions.LAUGH]: String.fromCodePoint(0x1f602),
  [ECommentReactions.CRY]: String.fromCodePoint(0x1f62d),
  [ECommentReactions.POOP]: String.fromCodePoint(0x1f4a9),
  [ECommentReactions.FIRE]: String.fromCodePoint(0x1f525),
  [ECommentReactions.WOW]: String.fromCodePoint(0x1f62e),
  [ECommentReactions.THUMBS_UP]: String.fromCodePoint(0x1f44d),
  [ECommentReactions.ANGRY]: String.fromCodePoint(0x1f620),
  [ECommentReactions.CLAP]: String.fromCodePoint(0x1f44f),
  [ECommentReactions.THINKING]: String.fromCodePoint(0x1f914),
};
