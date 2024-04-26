import { EAppRoutes } from '@/shared/types';
import { MenuProps } from 'antd';

export const navItems: MenuProps['items'] = [
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
];
