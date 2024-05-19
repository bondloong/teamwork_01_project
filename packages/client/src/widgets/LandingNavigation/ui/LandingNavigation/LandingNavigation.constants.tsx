import { EAppRoutes } from '@/shared/types';
import { NavItem } from './LandingNavigation.interfaces';
export const navItems: NavItem[] = [
  {
    label: 'Start game',
    path: EAppRoutes.Game,
  },
  {
    label: 'LeaderBoard',
    path: EAppRoutes.LeaderBoard,
  },
  {
    label: 'Join the Community',
    path: EAppRoutes.Forum,
  },
  {
    label: 'Profile',
    path: EAppRoutes.Profile,
  },
];
