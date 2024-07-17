import { Switch } from 'antd';
import { ThemeSwitchProps } from './ThemeSwitch.interfaces';
import { useTheme } from '@/shared/hooks/theme';
import { DARK_THEME } from '@/shared/hooks/theme/themeProvider.constants';

export const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { currentTheme, toggleTheme } = useTheme();
  return (
    <div>
      <Switch
        checked={currentTheme === DARK_THEME}
        onChange={toggleTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
};
