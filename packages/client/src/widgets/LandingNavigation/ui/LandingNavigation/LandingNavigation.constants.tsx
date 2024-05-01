import { EAppRoutes } from '@/shared/types';
import { NavItem } from './LandingNavigation.interfaces';
export const navItems: NavItem[] = [
  {
    label: 'Join the Community',
    key: EAppRoutes.Home,
  },
  {
    label: 'Compete for Glory',
    key: EAppRoutes.LeaderBoard,
  },
  {
    label: 'Customize Your Ship',
    key: EAppRoutes.Game,
  },
  {
    label: 'Start Your Adventure',
    key: EAppRoutes.Forum,
  },
];
