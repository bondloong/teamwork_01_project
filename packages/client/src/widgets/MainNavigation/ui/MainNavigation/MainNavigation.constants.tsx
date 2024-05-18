import { EAppRoutes } from '@/shared/types';
import { MenuProps } from 'antd';

export const navItems: MenuProps['items'] = [
  {
    label: 'Main',
    key: EAppRoutes.Main,
  },
  {
    label: 'Play game',
    key: EAppRoutes.Game,
  },
  {
    label: 'LeaderBoard',
    key: EAppRoutes.LeaderBoard,
  },
  {
    label: 'Forum',
    key: EAppRoutes.Forum,
  },
  {
    label: 'Profile',
    key: EAppRoutes.Profile,
  },
];
