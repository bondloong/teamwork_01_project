import { EReactions } from '@/shared/types';

export const REACTION_ICONS: Record<EReactions, string> = {
  [EReactions.HEART]: String.fromCodePoint(0x1f9e1),
  [EReactions.LAUGH]: String.fromCodePoint(0x1f602),
  [EReactions.CRY]: String.fromCodePoint(0x1f62d),
  [EReactions.POOP]: String.fromCodePoint(0x1f4a9),
  [EReactions.FIRE]: String.fromCodePoint(0x1f525),
  [EReactions.WOW]: String.fromCodePoint(0x1f62e),
  [EReactions.THUMBS_UP]: String.fromCodePoint(0x1f44d),
  [EReactions.ANGRY]: String.fromCodePoint(0x1f620),
  [EReactions.CLAP]: String.fromCodePoint(0x1f44f),
  [EReactions.THINKING]: String.fromCodePoint(0x1f914),
};
