import { EAppRoutes } from '@/shared/types';
import { NavItem } from './LandingNavigation.interfaces';
export const navItems: NavItem[] = [
  {
    label: 'Join the Community',
    path: EAppRoutes.Forum,
  },
  {
    label: 'Compete for Glory',
    path: EAppRoutes.LeaderBoard,
  },
  {
    label: 'Customize Your Ship',
    path: EAppRoutes.Home,
  },
  {
    label: 'Start Your Adventure',
    path: EAppRoutes.Game,
    // path: EAppRoutes.Home,
  },
];
