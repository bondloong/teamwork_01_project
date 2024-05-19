import { ReactElement } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { TEXTS } from './NotFoundPage.constants';

export const NotFoundPage = (): ReactElement => {
  const { title, button } = TEXTS;
  return (
    <Result
      status="404"
      title="404"
      subTitle={title}
      extra={
        <Link to="/">
          <Button type="primary">{button}</Button>
        </Link>
      }
    />
  );
};
