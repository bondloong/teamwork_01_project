import { ButtonProps } from 'antd';

export interface ILogOutProps extends ButtonProps {
  buttonType?: ButtonProps['type'];
  danger?: boolean;
  ghost?: boolean;
}
