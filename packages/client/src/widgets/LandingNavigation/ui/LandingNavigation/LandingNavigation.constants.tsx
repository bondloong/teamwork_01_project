import { EAppRoutes } from '@/shared/types';
import { NavItem } from './LandingNavigation.interfaces';
export const navItems: NavItem[] = [
  {
    label: 'Join the Community',
    path: EAppRoutes.Home,
  },
  {
    label: 'Compete for Glory',
    path: EAppRoutes.LeaderBoard,
  },
  {
    label: 'Customize Your Ship',
    path: EAppRoutes.Game,
  },
  {
    label: 'Start Your Adventure',
    path: EAppRoutes.Forum,
  },
];
