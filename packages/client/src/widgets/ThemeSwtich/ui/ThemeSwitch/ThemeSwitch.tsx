import { Switch } from 'antd';
import { ThemeSwitchProps } from './ThemeSwitch.interfaces';
import { useTheme } from '@/shared/hooks/theme';

export const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { currentTheme, toggleTheme } = useTheme();
  return (
    <div>
      <Switch
        checked={currentTheme === 'dark'}
        onChange={toggleTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
};
